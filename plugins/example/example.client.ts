import Profile from './components/Profile.svelte';
import Username from './components/Username.svelte';

import { defineWidgetPack } from '#plugins';

export default defineWidgetPack({
    username: Username,
    pfp: Profile,
});