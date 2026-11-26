import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';
import { organisationRepo, widgetService } from '#lib/server/loader.ts';

export const load: PageServerLoad = async ({ locals }) => {
    const user = locals.user;

    if (!user)
        return redirect(301, '/login');

    const orgs = (await organisationRepo.findByOwner(user))
        .map(org => ({ name: org.name, url: org.getUrl() }));

    return {
        userData: {
            username: user.username,
            profilePic: user.getImageUrl(),
            desc: user.bio,
            connections: await widgetService.getConnectionWidgets(user),
            organizations: orgs,
            tournaments: [],
        }
    };
};