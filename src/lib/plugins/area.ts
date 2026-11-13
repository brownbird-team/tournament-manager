// Definition of all widget areas in the app

export const anonimousAreas = [
    'login'
] as const;

export const personalAreas = [
    'bracket',
    'matches',
    'profile',
    'connections',
] as const;

export type WidgetAreaAnon =
    (typeof anonimousAreas)[number];

export type WidgetAreaPersonal =
    (typeof personalAreas)[number];

export type WidgetArea =
    WidgetAreaAnon | WidgetAreaPersonal;