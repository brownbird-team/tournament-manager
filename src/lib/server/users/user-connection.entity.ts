import type { PluginUserRecordRaw } from "#lib/plugins/plugin-user.ts";
import type { OAuthUserData } from "../auth/oauth-user-data";

export interface UserConnectionCreateProps {
    userId: string,
    pluginId: string,
    oauth: OAuthUserData,
    pluginData: PluginUserRecordRaw,
}

export class UserConnection {
    constructor(
        public readonly userId: string,
        public readonly pluginId: string,
        public oauth: OAuthUserData,
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