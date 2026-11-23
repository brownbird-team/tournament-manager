import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { userSessionRepo } from '#lib/server/loader.ts';

export const POST: RequestHandler = async ({ locals, cookies }) => {
    const session = locals.userSession;

    if (!session)
        return redirect(301, '/');
    
    cookies.delete('sessionToken');
    await userSessionRepo.delete(session);
        
    return redirect(301, '/');
}