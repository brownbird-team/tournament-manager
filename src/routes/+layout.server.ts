import type { LayoutServerLoad } from "./$types";
import { APP_NAME } from '$app/env/public'

export const load: LayoutServerLoad = async ({ locals }) => {
    return {
        username: locals.user?.username,
        appName: APP_NAME,
    }
}