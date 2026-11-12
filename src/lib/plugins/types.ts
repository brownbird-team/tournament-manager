import type { Component, ComponentProps } from "svelte";

export type WidgetArea =
    | 'login'
    | 'bracket'
    | 'matches'; // TODO: add other areas

export type WidgetPack = 
    Record<string, Component<any>>;

export interface WidgetHandler<U, D> {
    area: WidgetArea;
    load: (userData: U) => D;
}

export interface Plugin<U, W extends WidgetPack> {
    title: string;
    widgets: {
        [k in keyof W]: WidgetHandler<U, ComponentProps<W[k]>>
    };
}

export type WidgetPackBundle = Record<string, WidgetPack>;

export type PluginBundle<B extends WidgetPackBundle> = {
    [k in keyof B]: Plugin<any, B[k]>
}