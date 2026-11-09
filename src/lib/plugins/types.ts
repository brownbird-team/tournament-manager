import type { Component, ComponentProps } from "svelte";

export type WidgetPack = 
    Record<string, Component<any>>;

export type WidgetArea =
    | 'login'
    | 'bracket'
    | 'matches'; // TODO: add other areas

export interface WidgetHandler<U, D> {
    area: WidgetArea;
    load: (userData: U) => D;
}

export interface Plugin<U, W extends WidgetPack> {
    id: string;
    title: string;
    widgets: {
        [k in keyof W]: WidgetHandler<U, ComponentProps<W[k]>>
    };
}