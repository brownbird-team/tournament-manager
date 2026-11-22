import { isRedirect, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { authService } from "#lib/server/loader.ts";
import { AuthError } from '#lib/server/utils/errors.ts';

export const GET: RequestHandler = async ({ url, cookies, locals, params }) => {
    try {
        const userSession = await authService.authCallback(
            params.pluginId, url, locals.userSession
        );
        cookies.set('sessionToken', userSession.token);
        return redirect(301, '/');

    } catch (err) {
        if (isRedirect(err))
            throw err;

        if (err instanceof AuthError) {
            return new Response(err.message, { status: 400 });
        }
        else {
            console.error(err);
            return new Response('Internal server error', { status: 500 });
        }
    }
}