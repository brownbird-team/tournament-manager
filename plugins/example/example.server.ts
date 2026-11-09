import widgets from './example.client';
import type { Plugin } from '#plugins/core/types.ts';

export interface DiscordUserData {
    id: string;
    username: string;
    pfp: string;
}

export const plugin = {
    id: 'core.discord',
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
    
} satisfies Plugin<DiscordUserData, typeof widgets>;

export default plugin;