import widgets from './example2.client';
import type { PluginConfig } from '#plugins/core/types.ts';

export interface DiscordUserData {
    id: string;
    username: string;
    pfp: string;
}

export const plugin = {
    title: 'My discord plugin 2',
    widgets: {
        handle2: {
            area: 'bracket',
            load: (data) => ({ handle: data.username }),
        },
        pfp2: {
            area: 'bracket',
            load: (data) => ({ url: data.pfp }),
        },
        login: {
            area: 'login',
            load: () => ({})
        }
    }
    
} satisfies PluginConfig<DiscordUserData, typeof widgets>;

export default plugin;