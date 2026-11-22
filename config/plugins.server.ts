import { definePluginRegistry } from '#plugins';

import widgetRegistry from './plugins.client';
import generic from '#plugins/generic/generic.server.ts';

import { 
    BBAUTH_CLIENT_ID,
    BBAUTH_CLIENT_SECRET
} from '$app/env/private';

export default definePluginRegistry(widgetRegistry, {
    bbauth: generic({
        providerName: 'BrownBird Auth',
        providerUrl: `https://auth.brownbird.eu/oauth2/openid/${BBAUTH_CLIENT_ID}`,
        clientId: BBAUTH_CLIENT_ID,
        clientSecret: BBAUTH_CLIENT_SECRET,
    }),
});