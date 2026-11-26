// Utils
import type { StringKeys } from "#lib/types.ts";
import { AuthError, InternalError } from "../utils/errors";
import { genUsername } from "../utils/generators";

// Plugin stuff
import type { PluginRegistry } from "#plugins";
import type { PluginAuthConfig, PluginAuthSystemInfo } from "#lib/plugins/plugin-auth.ts";
import type { PluginRegistryConfig } from "#lib/plugins/plugin.ts";
import type { WidgetRegistryConfig } from "#lib/plugins/widget.ts";

// Entities
import { OAuthRequest } from "./oauth-request.entity";
import { User } from "../users/user.entity";
import { UserConnection } from "../users/user-connection.entity";
import { UserSession } from "../users/user-session.entity";

// Repositories
import type { UserRepository } from "../users/user.repository";
import type { OAuthRequestRepository } from "./oauth-request.repository";
import type { UserConnectionRepository } from "../users/user-connection.repository";
import type { UserSessionRepository } from "../users/user-session.repository";

// OAuth lib
import * as client from 'openid-client';
import type { Configuration } from "openid-client";

// Env
import { ORIGIN } from '$app/env/private';
import { OAuthUserData } from "./oauth-user-data";


export class AuthService<
    W extends WidgetRegistryConfig,
    P extends PluginRegistryConfig<W>
> {
    private configMap: Map<StringKeys<W>, { 
        oauth: Configuration;
        plugin: PluginAuthConfig;
    }>;

    readonly CODE_CHALLENGE_METHOD = 'S256';

    constructor(
        private pluginReg: PluginRegistry<W, P>,
        private userRepo: UserRepository,
        private userConnRepo: UserConnectionRepository,
        private oauthReqRepo: OAuthRequestRepository,
        private userSessionRepo: UserSessionRepository,
    ) {
        this.configMap = new Map();
    }

    // Fetch auth config from all plugins and run server discovery
    async initialize() {
        for (const pId of this.pluginReg.getPluginList()) {

            const plugin = this.pluginReg.getPlugin(pId);
            const config = plugin.handleAuthSetup();

            const serverUrl = new URL(config.server);

            this.configMap.set(pId, {
                plugin: config,
                oauth: await client.discovery(
                    serverUrl,
                    config.clientId, 
                    config.clientSecret
                ),
            });
        }
    }

    // Check if plugin ID is valid and fetch config from map
    private getConfig(pId?: string) {
        if (!pId || !this.pluginReg.hasPlugin(pId))
            throw new AuthError('Unknown auth plugin requested');

        const config = this.configMap.get(pId);

        if (!config)
            throw new InternalError(
                'Failed to get config for available auth plugin'
            );

        return {
            pluginId: pId,
            oauthConfig: config.oauth,
            pluginConfig: config.plugin,
        };
    }

    // Compute redirect url for given plugin ID
    genRedirectUri(pId: StringKeys<W>) {
        return ORIGIN + `/oauth2/${pId}/callback`;
    }

    // Compute login url for given plugin ID
    genLoginUri(pId: StringKeys<W>) {
        return ORIGIN + `/oauth2/${pId}`;
    }

    // Start auth flow, return URL where user should be redirected
    async authRequest(pId: string): Promise<URL> {
        const { oauthConfig, pluginConfig, pluginId } = this.getConfig(pId);

        const req = OAuthRequest.create({
            useNonce: !oauthConfig.serverMetadata().supportsPKCE(),
        });

        await this.oauthReqRepo.save(req);

        // Add openid scope if not there and convert to string
        const scope = Array.from(
            new Set([ 'openid', ...pluginConfig.scope ])
        ).join(' ');

        const parameters: Record<string, string> = {
            scope,
            redirect_uri: this.genRedirectUri(pluginId),
            code_challenge: await req.getChallenge(),
            code_challenge_method: this.CODE_CHALLENGE_METHOD,
            state: req.state,
        };

        return client.buildAuthorizationUrl(oauthConfig, parameters);
    }

    // Handle oauth user comeback
    async authCallback(pId: string, url: URL, userSession?: UserSession): Promise<UserSession> {
        const { oauthConfig, pluginId } = this.getConfig(pId);

        const state = url.searchParams.get('state');

        const req = state ?
            await this.oauthReqRepo.findByState(state) : undefined;

        if (!req || !req.valid())
            throw new AuthError('Given callback is invalid or expired');

        const tokens = await client.authorizationCodeGrant(oauthConfig, url, {
            pkceCodeVerifier: req.verifier,
            expectedNonce: req.nonce,
            idTokenExpected: true,
            expectedState: req.state,
        });

        const claims = tokens.claims();

        if (!claims)
            throw new AuthError('Received invalid response from auth server, claims are missing');

        let expiresAt: Date | undefined;
        const expiresIn = tokens.expiresIn();

        if (expiresIn) {
            expiresAt = new Date();
            expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);
        }

        const userData = new OAuthUserData(
            claims.sub,
            tokens.access_token,
            expiresAt,
            tokens.refresh_token,
        );

        const userInfo = await client.fetchUserInfo(
            oauthConfig, tokens.access_token, claims.sub
        );

        const pluginUserRecord = await this.pluginReg.getPlugin(pluginId)
            .handleAuthRequest({
                userInfo,
                fetch: (url, options) => client.fetchProtectedResource(
                    oauthConfig, 
                    tokens.access_token, 
                    url, 
                    options?.method ?? 'GET',
                    options?.body,
                    options?.headers
                ),
            });

        let userConn = await this.userConnRepo.findByOAuthSub(
            pluginId, userInfo.sub
        );

        if (!userConn) {
            let userId = userSession?.userId;

            if (!userId) {
                const user = User.create({
                    username: genUsername(),
                });

                // TODO: IMPORTANT! IMPORTANT! IMPORTANT!
                // We need to check if generated username already exists

                await this.userRepo.save(user);
                userId = user.id;
            }

            userConn = UserConnection.create({
                userId,
                pluginId,
                oauth: userData,
                pluginData: pluginUserRecord,
            });
        }
        
        else {
            userConn.oauth = userData;
            userConn.pluginData = pluginUserRecord;
        }

        await this.userConnRepo.save(userConn);

        if (userSession && userSession.pluginId === pluginId) {
            userSession.oauth = userData;
            await this.userSessionRepo.save(userSession);
        }

        else if (!userSession) {
            userSession = UserSession.create({
                userId: userConn.userId,
                pluginId,
                oauth: userData,
            });
            await this.userSessionRepo.save(userSession);
        }

        return userSession;
    }

    getSystemInfo() {
        const systemInfo:
            Partial<Record<StringKeys<W>, PluginAuthSystemInfo>> = {};

        for (const pId of this.pluginReg.getPluginList()) {
            systemInfo[pId] = {
                loginUrl: this.genLoginUri(pId),
            }
        }

        return systemInfo as 
            Record<StringKeys<W>, PluginAuthSystemInfo>;
    }
}