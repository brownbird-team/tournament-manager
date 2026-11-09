import type { Plugin, ServerWidget } from '../plugin'

interface DiscordUser {
    id: string;
    handle: string;
}

const loginWidget: ServerWidget<DiscordUser, { handle: string }> = {
    id: 'login',
    displayName: 'Login',
    area: 'login',
    load: (data) => ({ handle: data.handle }),
}

export const plugin: Plugin<DiscordUser> = {
    id: 'core.discord',
    displayName: 'Discord Plugin',
    widgets: [
        loginWidget,
    ],
}