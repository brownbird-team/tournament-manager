import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { requireAuth } from '#lib/server/utils/require-auth.ts';
import { strOnly } from '#lib/server/utils/str-only.ts';
import { orgService } from '#lib/server/loader.ts';
import { FormError } from '#lib/server/utils/errors.ts';

const MAX_NAME_LENGTH = 20;
const MIN_NAME_LENGTH = 3;
const MAX_DESC_LENGTH = 160;

export const load: PageServerLoad = async ({ locals }) => {
    requireAuth(locals);
};

export const actions: Actions = {
    default: async ({ locals, request }) => {
        requireAuth(locals);

        const data = await request.formData();

        const slug = strOnly(data.get('slug'));
        const name = strOnly(data.get('name'));
        const description = strOnly(data.get('description'));
        const image = data.get('image')?? undefined;

        try {
            const org = await orgService.createOrganization(locals.user, {
                name, slug, description, image
            });

            redirect(301, org.getUrl());

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