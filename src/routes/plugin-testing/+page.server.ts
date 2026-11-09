import type { PageServerLoad } from './$types';

import type { PluginUserRecord } from "#lib/plugins/plugin-user.ts"
import type { DiscordUserData } from "#plugins/example/example.server.ts"

import pluginRegistry from '#config/plugins.server.ts';

export const load: PageServerLoad = () => {

    // Just an example, will never be used like this
    const randomExamplePluginUser: PluginUserRecord<DiscordUserData> = {
        userTypeId: 'core.plugin.example/v1',
        uniqueId: '00000000000000',
        data: {
            id: '00000000000000',
            username: 'ananas.man',
            profilePicture: 'https://2.gravatar.com/avatar/7308641d8e24ae33b18c19c89f37db214d05536faad2d4c6643c0e8b8485f2c7?size=512&d=initials',
        }
    }

    const randomUser = { example: randomExamplePluginUser };
    const widgets = pluginRegistry.getWidgetList('bracket');

    return {
        widgetsSpec: pluginRegistry.prepareWidgets(widgets, randomUser),
    }
}