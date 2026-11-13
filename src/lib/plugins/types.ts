import type { Component, ComponentProps } from "svelte";
import type { WidgetAreaAnon, WidgetAreaPersonal } from "./area";

// ---------------

export interface WidgetHandlerAnon<D> {
    area: WidgetAreaAnon;
    load: () => D;
}

export interface WidgetHandlerPersonal<U, D> {
    area: WidgetAreaPersonal;
    load: (user: U) => D;
}

export type WidgetHandler<U, D> =
    WidgetHandlerAnon<D> | WidgetHandlerPersonal<U, D>;

// ---------------

export type WidgetPackConfig =
    Record<string, Component<any>>;

export interface PluginConfig<U, W extends WidgetPackConfig> {
    title: string;
    widgets: {
        [k in keyof W]: WidgetHandler<U, ComponentProps<W[k]>>
    };
}

// ---------------

export type WidgetRegistryConfig =
    Record<string, WidgetPackConfig>;

export type PluginRegistryConfig<B extends WidgetRegistryConfig> = {
    [k in keyof B]: PluginConfig<any, B[k]>
}

// ---------------

export type WidgetPackRenderSpec<T extends WidgetPackConfig> = {
    [k in keyof T]: {
        wId: k;
        props: ComponentProps<T[k]>;
    };
}[keyof T];

export type WidgetRenderSpec<T extends WidgetRegistryConfig> = {
    [k in keyof T]: { pId: k } & WidgetPackRenderSpec<T[k]>;
}[keyof T];