import widgets from './generic.client';
import { definePlugin } from '#plugins';

interface GenericPluginData {
    userDisplayName: string;
}

interface GenericPluginConfig {
    providerName: string;
    providerUrl: string;
    clientId: string;
    clientSecret: string;
}

export default (config: GenericPluginConfig) => 
    definePlugin<GenericPluginData>()(widgets, {
        title: config.providerName,
        userTypeId: 'core.plugin.generic/v1',
        widgets: {
            login: {
                area: 'login',
                title: 'Generic login widget',
                prepare: () => ({
                    loginUrl: '',                      // TODO: IMPORTANT!
                    providerName: config.providerName, // Add server params to hooks
                }),
            },
            connection: {
                area: 'connections',
                title: 'Generic connection widget',
                prepare: (user) => ({
                    providerName: config.providerName,
                    userName: user.userDisplayName,
                }),
            },
        },
        hooks: {
            authSetup: () => ({
                server: config.providerUrl,
                clientId: config.clientId,
                clientSecret: config.clientSecret,
                scope: [ 'profile' ],
            }),
            authRequest: ({ userInfo }) => ({
                data: {
                    userDisplayName: userInfo.name ?? userInfo.sub,
                }
            }),
        }
    });