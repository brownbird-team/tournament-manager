import { organisationRepo } from "#lib/server/loader.ts";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {

    const org =
        await organisationRepo.findBySlug(encodeURIComponent(params.slug));

    if (!org)
        error(404);

    return {
        organisationData: {
            name: org.name,
            orgPic: org.getImageUrl(),
            desc: org.description,
        }
    };
};