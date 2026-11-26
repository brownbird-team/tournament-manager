import { userService } from '#lib/server/loader.ts';
import { FormError } from '#lib/server/utils/errors.ts';
import { requireAuth } from '#lib/server/utils/require-auth.ts';
import { strOnly } from '#lib/server/utils/str-only.ts';
import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    requireAuth(locals);

    console.log('hello')

    const user = locals.user;

    return {
        user: {
            username: user.username,
            profilePic: user.getImageUrl(),
            desc: user.bio || '',
            organizations: [],
            tournaments: []
        },

        plugins: {
            connected:
                await userService.getConnectedPlugins(user, locals.userSession),
            disconnected:
                await userService.getDisconnectedPlugins(user),
        }
    };
};

export const actions: Actions = {
    settings: async ({ locals, request }) => {
        requireAuth(locals);

        const data = await request.formData();

        const bio = strOnly(data.get('bio'));
        const username = strOnly(data.get('username'));
        const image = data.get('image');

        try {
            await userService.saveUserSettings(locals.user, {
                username, bio, image
            });

            await locals.refresh();

        } catch (err) {
            if (!(err instanceof FormError))
                throw err;

            return fail(400, {
                form: 'settings',
                errors: err.issues,
                data: {
                    username, bio
                },
            });
        }
    },

    disconnect: async ({ locals, request }) => {
        requireAuth(locals);

        const pluginId =
            (await request.formData()).get('plugin');

        if (typeof(pluginId) !== 'string')
            return;

        await userService.disconnectPlugin(
            locals.user, locals.userSession, pluginId
        );
    }
}