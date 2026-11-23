import type { ComponentProps } from "svelte";
import type { MaybePromise, StringKeys } from "#lib/types.ts";

import type {
    PluginAuthConfig, 
    PluginAuthRequest, 
    PluginAuthRefresh, 
    PluginAuthSystemInfo
} from "#lib/plugins/plugin-auth.ts";

import type {
    PluginUserRecord,
    PluginUserRecordRaw,
    PluginUserDataRaw,
    PluginUserTypeId
} from "./plugin-user";

import type {
    WidgetIdentifier,
    WidgetPackConfig,
    WidgetRegistryConfig,
    WidgetRenderSpec,
    WidgetPackRenderSpec,
} from './widget';

import type { WidgetArea } from "./widget-area";
import type { WidgetHandler } from './widget-handler';

/**
 * Plugin
 * Specification of a plugin.
 */

export interface Plugin<U, W extends WidgetPackConfig> {
    title: string;
    userTypeId: PluginUserTypeId;

    widgets: {
        [k in keyof W]: WidgetHandler<U, ComponentProps<W[k]>>
    };

    hooks: {
        authSetup:
            () => PluginAuthConfig;

        authRequest: (
            auth: PluginAuthRequest
        ) => MaybePromise<U>;

        authRefresh?: (
            auth: PluginAuthRefresh,
            pluginUser: PluginUserRecord<U>
        ) => MaybePromise<U>;
    };
}

/**
 * PluginWrapper
 * Provides generic interface that abstracts need to interact with plugin user
 * data.
 */

export interface PluginWrapper<W extends WidgetPackConfig> {
    hasWidget: 
        (wId: string) => wId is StringKeys<W>;
    getWidgetList:
        (area: WidgetArea) => StringKeys<W>[];

    prepareWidget: (
        wId: StringKeys<W>,
        systemInfo: PluginAuthSystemInfo,
        userRaw?: PluginUserRecordRaw
    ) => WidgetPackRenderSpec<W> | null;

    handleAuthSetup: 
        () => PluginAuthConfig;
    handleAuthRequest:
        (auth: PluginAuthRequest) => Promise<PluginUserRecordRaw>;

    handleAuthRefresh: (
        auth: PluginAuthRefresh, 
        userRaw: PluginUserRecordRaw
    ) => Promise<PluginUserRecordRaw>;
}

/**
 * PluginRegistry
 * Collects all plugin definitions and provides backend with API to use the
 * plugins.
 */

export interface PluginRegistry<
    W extends WidgetRegistryConfig,
    C extends PluginRegistryConfig<W>
> {
    // Check if plugin with given id is installed
    hasPlugin:
        (pId: string) => pId is StringKeys<W>;

    // Get array of all installed plugin ids
    getPluginList:
        () => StringKeys<W>[];

    getPlugin:
        <T extends StringKeys<W>>(pId: T) => C[T];

    // Get array of widget identifiers applying specified filters
    getWidgetList: (
        area: WidgetArea, 
        plugins?: StringKeys<W> | StringKeys<W>[]
    ) => WidgetIdentifier[];

    // Prepare widgets for rendering on the frontend, if required data to render
    // widget is missing it will be skipped
    prepareWidgets: (
        widgets: WidgetIdentifier[], 
        systemInfo: Record<StringKeys<W>, PluginAuthSystemInfo>,
        user?: PluginUserDataRaw
    ) => WidgetRenderSpec<W>[];
}

/**
 * PluginRegistryConfig
 * Contains plugin for each WidgetPack specified in WidgetRegistryConfig.
 */

export type PluginRegistryConfig<W extends WidgetRegistryConfig> = {
    [k in StringKeys<W>]: 
        PluginWrapper<W[k]['widgets']>;
}