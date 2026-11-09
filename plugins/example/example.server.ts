import widgets from './example.client';
import { definePlugin } from '#plugins';

export interface DiscordUserData {
    id: string;
    username: string;
    profilePicture: string;
}

export default definePlugin<DiscordUserData>()(widgets, {
    title: 'Example Discord Plugin',
    userTypeId: 'core.plugin.example/v1',
    widgets: {
        username: {
            title: 'Discord Handle',
            area: 'bracket',
            prepare: (user) => ({ username: user.username }),
        },
        pfp: {
            title: 'Discord profile picture',
            area: 'bracket',
            prepare: (user) => ({ url: user.profilePicture }),
        }
    },
    hooks: {
        authSetup: () => ({
            server: 'https://auth.discord.com/i/dont/know',
            clientId: '123',
            clientSecret: 'superSecret',
            scope: [ 'openid' ],
        }),
        authRequest: (authRequest) => ({
            uniqueId: '00000000000000000',
            data: {
                id: '0000000000000000',
                profilePicture: 'asdjasjlajkdsjskdajlsjdkasjdkasjd',
                username: 'bananaguy',
            },
        }),
    }
});