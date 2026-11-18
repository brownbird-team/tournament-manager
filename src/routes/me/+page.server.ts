import type { PageServerLoad } from './$types';

import profPic1 from '#lib/assets/profileLogo/pumpkin1.svg';
import profPic2 from '#lib/assets/profileLogo/pumpkin2.svg';
import profPic3 from '#lib/assets/profileLogo/pumpkin3.svg';
import profPic4 from '#lib/assets/profileLogo/pumpkin4.svg';

import { getUser } from '../../lib/server/user';

const defaultProfPic = [
    profPic1,
    profPic2,
    profPic3,
    profPic4
];

export const load: PageServerLoad = async ({ locals }) => {
    const user = await getUser('id2464'); //locals.userId 

    const randomProfile =
        defaultProfPic[Math.floor(Math.random() * defaultProfPic.length)];

    return {
        userData: {
            username: user.username,
            profilePic: user.profilePic || randomProfile,
            desc: user.desc || '',
            linkedServices: user.linkedDevices || [],
            organizations: user.organizations || [],
            tournaments: user.tournaments || []
        }
    };
};