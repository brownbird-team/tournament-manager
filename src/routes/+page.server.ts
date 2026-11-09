import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
    const dataFromDB = 'rdobovic';

    return {
        username: dataFromDB,
    }
}

export const actions = {
    brat: async (event) => {
        const form = await event.request.formData()
        console.log(`BRAT [${form.get('count')}] >>`, form.get('username'));
    },

    sestra: async (event) => {
        const form = await event.request.formData()
        console.log('SESTRA >>', form.get('username'));
    },

} satisfies Actions