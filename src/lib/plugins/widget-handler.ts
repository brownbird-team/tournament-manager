import { isAnonymousArea, isPersonalArea } from './widget-area';
import type { PluginAuthSystemInfo } from './plugin-auth';
import type { WidgetAreaAnon, WidgetAreaPersonal } from './widget-area'

export interface WidgetHandlerAnon<D> {
    title: string;
    area: WidgetAreaAnon;
    prepare: (args: { system: PluginAuthSystemInfo }) => D;
}

export interface WidgetHandlerPersonal<U, D> {
    title: string;
    area: WidgetAreaPersonal;
    prepare: (args: { system: PluginAuthSystemInfo, user: U }) => D;
}

export type WidgetHandler<U, D> =
    WidgetHandlerAnon<D> | WidgetHandlerPersonal<U, D>;

export function isWidgetHandlerAnon<U, D>(
    handler: WidgetHandler<U, D>
): handler is WidgetHandlerAnon<D> {
    return isAnonymousArea(handler.area);
}

export function isWidgetHandlerPersonal<U, D>(
    handler: WidgetHandler<U, D>
): handler is WidgetHandlerPersonal<U, D> {
    return isPersonalArea(handler.area);
}