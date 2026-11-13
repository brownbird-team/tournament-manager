import widgets from './example.client';
import type { PluginConfig } from '#plugins/core/types.ts';

export interface DiscordUserData {
    id: string;
    username: string;
    pfp: string;
}

export const plugin = {
    title: 'My discord plugin',
    widgets: {
        handle: {
            area: 'bracket',
            load: (data) => ({ handle: data.username }),
        },
        pfp: {
            area: 'bracket',
            load: (data) => ({ url: data.pfp }),
        }
    }
    
} satisfies PluginConfig<DiscordUserData, typeof widgets>;

export default plugin;