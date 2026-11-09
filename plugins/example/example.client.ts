import Handle from './components/Handle.svelte';
import Profile from './components/Profile.svelte';

import type { WidgetPack } from "#plugins/core/types.ts";

const widgets = {
    handle: Handle,
    pfp: Profile,

} satisfies WidgetPack;

export default widgets;