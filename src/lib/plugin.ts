import type { Component } from "svelte";

export type WidgetArea =
    | 'login'
    | 'scoreboard'
    | 'profile'
    | 'match'
    | 'backet';

export interface ServerWidget<U, T> {
    id: string;
    displayName: string;
    area: WidgetArea;
    load: (data: U) => T;
}

export type WidgetPack =
    Record<string, Component<{ user: any }>>

export interface Plugin<U> {
    id: string;
    displayName: string;
    widgets: ServerWidget<U, any>[];
    // ...
}