import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';
import { widgetService } from '#lib/server/loader.ts';

export const load: PageServerLoad = async ({ locals }) => {
    const user = locals.user;

    if (!user)
        return redirect(301, '/login');

    return {
        userData: {
            username: user.username,
            profilePic: user.getImageUrl(),
            desc: user.bio,
            connections: await widgetService.getConnectionWidgets(user),
            organizations: [],
            tournaments: [],
        }
    };
};