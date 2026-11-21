import type { Database } from "../db/types";
import * as schema from '#lib/server/db/schema.ts';
import { UserConnection } from "../entities/user-connection";
import { OAuthTokenPair } from "#lib/auth/token.ts";
import type { PluginUserRecordRaw } from "#lib/plugins/plugin-user.ts";
import { and, eq } from "drizzle-orm";
import type { User } from "../entities/user";

class UserConnectionMapper {
    static toEntity(data: typeof schema.userConn.$inferSelect): UserConnection {
        const pluginUserData: PluginUserRecordRaw = {
            uniqueId: data.pluginUserId,
            data: data.pluginData,
            userTypeId: data.pluginDataTypeId,
        }

        return new UserConnection(
            data.userId,
            data.pluginId,
            OAuthTokenPair.fromFlat(data),
            pluginUserData,
            data.createdAt,
        );
    }

    static toDatabase(conn: UserConnection): typeof schema.userConn.$inferInsert {
        return {
            userId: conn.userId,
            pluginId: conn.pluginId,
            pluginUserId: conn.pluginData.uniqueId,
            pluginData: conn.pluginData.data,
            pluginDataTypeId: conn.pluginData.userTypeId,
            createdAt: conn.createdAt,

            ...conn.oauth.toFlat(),
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

    async findByPluginUserId(
        pluginId: string, 
        pluginUserId: string
    ): Promise<UserConnection | null> {

        const res = await this.db.select()
            .from(schema.userConn)
            .where(and(
                eq(schema.userConn.pluginId, pluginId),
                eq(schema.userConn.pluginUserId, pluginUserId)
            ));

        return res.length > 0 ? UserConnectionMapper.toEntity(res[0]) : null;
    }
}