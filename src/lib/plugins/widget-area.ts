// Definition of all widget areas in the app

export const anonymousAreas = [
    'login'
] as const;

export type WidgetAreaAnon =
    (typeof anonymousAreas)[number];

export function isAnonymousArea(area: WidgetArea): area is WidgetAreaAnon {
    return anonymousAreas.some(aa => area === aa);
}

export const personalAreas = [
    'bracket',
    'matches',
    'profile',
    'connections',
] as const;

export type WidgetAreaPersonal =
    (typeof personalAreas)[number];

export function isPersonalArea(area: WidgetArea): area is WidgetAreaPersonal {
    return personalAreas.some(pa => area === pa);
}

export type WidgetArea =
    WidgetAreaAnon | WidgetAreaPersonal;