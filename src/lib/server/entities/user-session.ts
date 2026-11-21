import { genToken } from '#lib/server/utils.ts';
import { OAuthTokenPair } from "#lib/auth/token.ts";

export interface UserSessionCreateProps {
    userId: string,
    pluginId: string,
    oauth: OAuthTokenPair,
}

export class UserSession {
    constructor(
        public readonly token: string,
        public readonly userId: string,
        public readonly pluginId: string,
        public oauth: OAuthTokenPair,
        public readonly createdAt: Date,
    ) {}

    valid(): boolean {
        return this.oauth.access.expiresAt > (new Date());
    }

    static create(data: UserSessionCreateProps) {
        return new UserSession(
            genToken(),
            data.userId,
            data.pluginId,
            data.oauth,
            new Date(),
        );
    }
}