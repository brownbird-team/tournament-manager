import { isRedirect, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { authService } from "#lib/server/loader.ts";
import { AuthError } from '#lib/server/utils/errors.ts';

export const GET: RequestHandler = async ({ params }) => {
    const { pluginId } = params;

    try {
        const url = await authService.authRequest(pluginId);
        return redirect(301, url.href, { external: true });
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