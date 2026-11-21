import { OAuthTokenPair } from "#lib/auth/token.ts";
import type { PluginUserRecordRaw } from "#lib/plugins/plugin-user.ts";

export interface UserConnectionCreateProps {
    userId: string,
    pluginId: string,
    oauth: OAuthTokenPair,
    pluginData: PluginUserRecordRaw,
}

export class UserConnection {
    constructor(
        public readonly userId: string,
        public readonly pluginId: string,
        public oauth: OAuthTokenPair,
        public pluginData: PluginUserRecordRaw,
        public readonly createdAt: Date,
    ) {}

    static create(data: UserConnectionCreateProps) {
        return new UserConnection(
            data.userId,
            data.pluginId,
            data.oauth,
            data.pluginData,
            new Date(),
        );
    }
}