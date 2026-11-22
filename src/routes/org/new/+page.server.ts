import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const MAX_NAME_LENGTH = 20;
const MIN_NAME_LENGTH = 3;
const MAX_DESC_LENGTH = 160;

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const name = String(data.get('name') ?? '').trim();
        const desc = String(data.get('description') ?? '').trim();
        const profile = data.get('profilePic');

        if (name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH)
            return fail(400, { error: 'Name must be between ' + MIN_NAME_LENGTH + ' and ' + MAX_NAME_LENGTH + ' characters.'});

        if (desc.length > MAX_DESC_LENGTH)
            return fail(400, { error: 'Description cannot exceed ' + MAX_DESC_LENGTH + ' characters.' });

        if (profile instanceof File && profile.size > 0) {
            const allowedTypes = [
                'image/jpeg',
                'image/png',
                'image/webp'
            ];

            if (!allowedTypes.includes(profile.type)) { return fail(400, { error: 'Invalid profile picture format.' });
            }
        }

        return { success: true, message: 'Organization created successfully!'};
    }
};