import type { Database } from "../db/types";
import * as schema from '#lib/server/db/schema.ts';
import { UserConnection } from "./user-connection.entity";
import type { PluginUserRecordRaw } from "#lib/plugins/plugin-user.ts";
import { and, eq } from "drizzle-orm";
import type { User } from "./user.entity";
import { OAuthUserData } from "../auth/oauth-user-data";

class UserConnectionMapper {
    static toEntity(data: typeof schema.userConn.$inferSelect): UserConnection {
        const pluginUserData: PluginUserRecordRaw = {
            data: data.pluginData,
            userTypeId: data.pluginDataTypeId,
        }

        return new UserConnection(
            data.userId,
            data.pluginId,
            new OAuthUserData(
                data.oAuthSub,
                data.oAuthAccessToken,
                data.oAuthExpiresAt ?? undefined,
                data.oAuthRefreshToken ?? undefined,
            ),
            pluginUserData,
            data.createdAt,
        );
    }

    static toDatabase(conn: UserConnection): typeof schema.userConn.$inferInsert {
        return {
            userId: conn.userId,
            pluginId: conn.pluginId,
            pluginData: conn.pluginData.data,
            pluginDataTypeId: conn.pluginData.userTypeId,
            createdAt: conn.createdAt,
            oAuthSub: conn.oauth.sub,
            oAuthAccessToken: conn.oauth.accessToken,
            oAuthExpiresAt: conn.oauth.expiresAt,
            oAuthRefreshToken: conn.oauth.refreshToken,
        };
    }
}

export class UserConnectionRepository {
    constructor(
        private db: Database,
    ) {}

    async save(conn: UserConnection) {
        const connDb = UserConnectionMapper.toDatabase(conn);

        await this.db.insert(schema.userConn)
            .values(connDb)
            .onConflictDoUpdate({
                target: [ schema.userConn.userId, schema.userConn.pluginId ],
                set: connDb
            });
    }

    async delete(conn: UserConnection) {
        await this.db.delete(schema.userConn)
            .where(and(
                eq(schema.userConn.userId, conn.userId),
                eq(schema.userConn.pluginId, conn.pluginId)
            ));
    }

    async findByUser(user: User): Promise<UserConnection[]> {
        const res = await this.db.select()
            .from(schema.userConn)
            .where(eq(schema.userConn.userId, user.id));

        return res.map(rec => UserConnectionMapper.toEntity(rec));
    }

    async findByOAuthSub(
        pluginId: string, 
        oAuthSub: string
    ): Promise<UserConnection | null> {

        const res = await this.db.select()
            .from(schema.userConn)
            .where(and(
                eq(schema.userConn.pluginId, pluginId),
                eq(schema.userConn.oAuthSub, oAuthSub)
            ));

        return res.length > 0 ? UserConnectionMapper.toEntity(res[0]) : null;
    }

    async findByUserAndPlugin(
        user: User,
        pluginId: string
    ): Promise<UserConnection | null> {

        const res = await this.db.select()
            .from(schema.userConn)
            .where(and(
                eq(schema.userConn.userId, user.id),
                eq(schema.userConn.pluginId, pluginId)
            ));

        return res.length > 0 ? UserConnectionMapper.toEntity(res[0]) : null;
    }
}