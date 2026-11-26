import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { requireAuth } from '#lib/server/utils/require-auth.ts';
import { strOnly } from '#lib/server/utils/str-only.ts';
import { organisationRepo, orgService } from '#lib/server/loader.ts';
import { FormError } from '#lib/server/utils/errors.ts';

const MAX_NAME_LENGTH = 20;
const MIN_NAME_LENGTH = 3;
const MAX_DESC_LENGTH = 160;

export const load: PageServerLoad = async ({ locals, params }) => {
    requireAuth(locals);

    const org =
        await organisationRepo.findBySlug(encodeURIComponent(params.slug));

    if (!org)
        error(404);

    if (!(await organisationRepo.userIsOwner(org, locals.user)))
        redirect(401, org.getUrl());

    return {
        organization: {
            name: org.name,
            desc: org.description,
            slug: org.slug,
            image: org.getImageUrl(),
        },
    }
};

export const actions: Actions = {
    default: async ({ locals, request, params }) => {
        requireAuth(locals);

        const org =
            await organisationRepo.findBySlug(encodeURIComponent(params.slug));

        if (!org)
            error(404);

        if (!(await organisationRepo.userIsOwner(org, locals.user)))
            redirect(401, org.getUrl());

        const data = await request.formData();

        const slug = strOnly(data.get('slug'));
        const name = strOnly(data.get('name'));
        const description = strOnly(data.get('description'));
        const image = data.get('image') ?? undefined;

        try {
            const newOrg = await orgService.saveOrgSettings(org, {
                name, slug, description, image
            });

            redirect(301, newOrg.getUrl());

        } catch (err) {
            if (!(err instanceof FormError))
                throw err;

            return fail(400, {
                errors: err.issues,
                data: {
                    name, slug, description
                },
            });
        }
    }
};