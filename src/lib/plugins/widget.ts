import type { StringKeys } from "#lib/types.ts";
import type { Component, ComponentProps } from "svelte";

/**
 * WidgetIdentifier
 * Widget reference that can be stored in the DB
 */

export type WidgetIdentifier = { pId: string; wId: string; };

/**
 * WidgetPack
 * Defines components for all widgets provided by the plugin.
 */

export type WidgetPackConfig =
    Record<string, Component<any>>;

export type WidgetPack<C extends WidgetPackConfig> = {
    widgets: C;
    has: (key: string) => key is StringKeys<C>;
}

/**
 * WidgetRegistry
 * Collects WidgetPacks for all installed plugins.
 */

export type WidgetRegistryConfig =
    Record<string, WidgetPack<any>>; // TODO: This probably shouldn't have any as argument

export type WidgetRegistry<C extends WidgetRegistryConfig> = {
    packs: C;
    has: (key: string) => key is StringKeys<C>;
    resolve: (spec: WidgetRenderSpec<C>) => WidgetRenderable<C>;
}

/**
 * WidgetRenderSpec
 * This union type is generated on the backend and contains all data needed to
 * render a widget.
 */

export type WidgetPackRenderSpec<T extends WidgetPackConfig> = {
    [k in StringKeys<T>]: {
        wId: k;
        props: ComponentProps<T[k]>;
    };
}[StringKeys<T>];

export type WidgetRenderSpec<T extends WidgetRegistryConfig> = {
    [k in StringKeys<T>]: { pId: k } & WidgetPackRenderSpec<T[k]['widgets']>;
}[StringKeys<T>];

/**
 * WidgetRenderable
 * Generated on the frontend from received WidgetRenderSpec, it contains
 * component to be rendered and the props that will be supplied to it.
 */

export type WidgetPackRenderable<T extends WidgetPackConfig> = {
    [k in StringKeys<T>]: {
        component: T[k];
        props: ComponentProps<T[k]>;
    }
}[StringKeys<T>];

export type WidgetRenderable<T extends WidgetRegistryConfig> = {
    [k in StringKeys<T>]: WidgetPackRenderable<T[k]['widgets']>;
}[StringKeys<T>];