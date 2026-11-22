import type { Database } from "../db/types";
import * as schema from '#lib/server/db/schema.ts';
import { UserSession } from "./user-session.entity";
import { eq } from "drizzle-orm";
import type { User } from "./user.entity";
import { OAuthUserData } from "../auth/oauth-user-data";

class UserSessionMapper {
    static toEntity(data: typeof schema.userSession.$inferSelect): UserSession {
        return new UserSession(
            data.sessionToken,
            data.userId,
            data.pluginId,
            new OAuthUserData(
                data.oAuthSub,
                data.oAuthAccessToken,
                data.oAuthExpiresAt ?? undefined,
                data.oAuthRefreshToken ?? undefined,
            ),
            data.createdAt,
        );
    }

    static toDatabase(session: UserSession): typeof schema.userSession.$inferInsert {
        return {
            sessionToken: session.token,
            userId: session.userId,
            pluginId: session.pluginId,
            createdAt: session.createdAt,
            oAuthSub: session.oauth.sub,
            oAuthAccessToken: session.oauth.accessToken,
            oAuthExpiresAt: session.oauth.expiresAt,
            oAuthRefreshToken: session.oauth.refreshToken,
        }
    }
}

export class UserSessionRepository {
    constructor(
        private db: Database,
    ) {}

    async save(session: UserSession) {
        const sessionDb = UserSessionMapper.toDatabase(session);

        await this.db.insert(schema.userSession)
            .values(sessionDb)
            .onConflictDoUpdate({
                target: schema.userSession.sessionToken,
                set: sessionDb,
            });
    }

    async delete(session: UserSession) {
        await this.db.delete(schema.userSession)
            .where(eq(schema.userSession.sessionToken, session.token));
    }

    async deleteAllForUser(user: User) {
        await this.db.delete(schema.userSession)
            .where(eq(schema.userSession.userId, user.id));
    }

    async findByToken(token: string): Promise<UserSession | null> {
        const res = await this.db.select()
            .from(schema.userSession)
            .where(eq(schema.userSession.sessionToken, token));

        return res.length > 0 ? UserSessionMapper.toEntity(res[0]) : null;
    }

    async findByUser(user: User): Promise<UserSession[]> {
        const res = await this.db.select()
            .from(schema.userSession)
            .where(eq(schema.userSession.userId, user.id));

        return res.map(rec => UserSessionMapper.toEntity(rec));
    }
}