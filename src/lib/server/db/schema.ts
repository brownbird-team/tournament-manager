import type { PluginUserTypeId } from '#lib/plugins/plugin-user.ts';
import { pgTable, text, timestamp, varchar, json, uuid, primaryKey, foreignKey, unique } from 'drizzle-orm/pg-core';

/**
 * OAuth data, unrelated to anything
 */

export const oauthRequest = pgTable('oauth_request', {
    challenge: text('challange')
        .primaryKey(),
    verifier: text('verifier')
        .unique()
        .notNull(),
    nonce: text('nonce')
        .unique(),
    createdAt: timestamp('created_at')
        .notNull(),
});

/**
 * User data
 */

export const user = pgTable('user', {
    userId: uuid('user_id')
        .primaryKey(),
    username: varchar('username')
        .unique()
        .notNull(),
    bio: text('bio'),
    profileImage: varchar('profile_image'),
});

export const userConn = pgTable('user_connection', {
    userId: uuid('user_id')
        .references(() => user.userId)
        .notNull(),
    pluginId: varchar('plugin_id')
        .notNull(),

    pluginUserId: varchar()
        .notNull(),
    pluginData: json('plugin_data')
        .notNull()
        .$type<unknown>(),
    pluginDataTypeId: varchar('plugin_data_type_id')
        .notNull()
        .$type<PluginUserTypeId>(),

    oAuthAccessToken: text('oauth_access_token')
        .notNull(),
    oAuthAccessExpiresAt: timestamp('oauth_access_expires_at')
        .notNull(),
    oAuthRefreshToken: text('oauth_refresh_token'),
    oAuthRefreshExpiresAt: timestamp('oauth_refresh_expires_at'),

    createdAt: timestamp('created_at')
        .notNull(),
}, (table) => [
    primaryKey({ columns: [table.userId, table.pluginId] }),
    unique().on(table.pluginId, table.pluginUserId),
]);

export const userSession = pgTable('user_session', {
    sessionToken: text('session_token')
        .primaryKey(),
    userId: uuid('user_id')
        .notNull(),
    pluginId: varchar('plugin_id')
        .notNull(),

    oAuthAccessToken: text('oauth_access_token')
        .notNull(),
    oAuthAccessExpiresAt: timestamp('oauth_access_expires_at')
        .notNull(),
    oAuthRefreshToken: text('oauth_refresh_token'),
    oAuthRefreshExpiresAt: timestamp('oauth_refresh_expires_at'),

    createdAt: timestamp('created_at')
        .notNull(),
}, (table) => [
    foreignKey({ 
        columns: [ table.userId, table.pluginId ],
        foreignColumns: [ userConn.userId, userConn.pluginId ],
    }),
]);

/**
 * Organizations
 */

export const org = pgTable('organization', {
    orgId: uuid('organization_id')
        .primaryKey(),
    slug: varchar('slug')
        .unique()
        .notNull(),
    description: text('description'),
    apiToken: text('api_token')
        .unique()
        .notNull(),
});

export const orgOwner = pgTable('organization_owner', {
    orgId: uuid('organization_id'),
    userId: uuid('user_id'),
}, (table) => [
    primaryKey({ columns: [ table.orgId, table.userId ] }),
]);