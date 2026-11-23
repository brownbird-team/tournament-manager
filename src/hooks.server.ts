import type { ServerInit, Handle } from "@sveltejs/kit/hooks";
import { authService, userRepo, userSessionRepo } from "#lib/server/loader.ts";

export const init: ServerInit = async () => {
    await authService.initialize();
}

export const handle: Handle = async ({ event, resolve }) => {
    const sessionToken = event.cookies.get('sessionToken');

    if (sessionToken) {
        const session = await userSessionRepo.findByToken(sessionToken);

        if (session) {
            event.locals.userSession = session;
            event.locals.user =
                await userRepo.findById(session.userId) ?? undefined;
        }
    }

    return await resolve(event);
}