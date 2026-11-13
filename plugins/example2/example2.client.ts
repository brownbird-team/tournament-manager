import Handle from './components/Handle.svelte';
import Profile from './components/Profile.svelte';
import Login from './components/Login.svelte';

import type { WidgetPackConfig } from "#plugins/core/types.ts";

export default {
    handle2: Handle,
    pfp2: Profile,
    login: Login,

} satisfies WidgetPackConfig;