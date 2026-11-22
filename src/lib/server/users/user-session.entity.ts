import { genToken } from '#lib/server/utils/generators.ts';
import type { OAuthUserData } from '../auth/oauth-user-data';

export interface UserSessionCreateProps {
    userId: string,
    pluginId: string,
    oauth: OAuthUserData,
}

export class UserSession {
    constructor(
        public readonly token: string,
        public readonly userId: string,
        public readonly pluginId: string,
        public oauth: OAuthUserData,
        public readonly createdAt: Date,
    ) {}

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