/**
 * PluginUserTypeId
 * This id is stored next to the data inside the database, it is used to validate
 * if data indeed came from the plugin when parsing. Not perfect but good enough
 * for now.
 */

export type PluginUserTypeId =
    `${string}/v${string}`;

/**
 * PluginUserRecord
 * Data attached to user account by the plugin.
 */

export interface PluginUserRecord<U> {
    uniqueId: string;
    userTypeId: PluginUserTypeId;
    data: U;
}

export type PluginUserRecordRaw = PluginUserRecord<unknown>;

/**
 * PluginUserData
 * Collection of plugin data for one user.
 */

export type PluginUserDataRaw =
    Record<string, PluginUserRecordRaw>