import type { PageServerLoad } from "./$types";
import { widgetService } from "#lib/server/loader.ts";

export const load: PageServerLoad = async ({ locals }) => {
    return {
        widgets: widgetService.getLoginWidgets(),
    }
}