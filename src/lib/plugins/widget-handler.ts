import { isAnonymousArea, isPersonalArea } from './widget-area';
import type { WidgetAreaAnon, WidgetAreaPersonal } from './widget-area'

export interface WidgetHandlerAnon<D> {
    title: string;
    area: WidgetAreaAnon;
    prepare: () => D;
}

export interface WidgetHandlerPersonal<U, D> {
    title: string;
    area: WidgetAreaPersonal;
    prepare: (user: U) => D;
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