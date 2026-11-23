import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    const user = locals.user;

    if (!user)
        return redirect(301, '/login');

    return {
        userData: {
            username: user.username,
            profilePic: user.getImageUrl(),
            desc: user.bio || '',
            linkedServices: [],
            organizations: [],
            tournaments: []
        }
    };
};