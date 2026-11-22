import { defineWidgetRegistry } from '#plugins';

import generic from '#plugins/generic/generic.client.ts';

export default defineWidgetRegistry({
    bbauth: generic,
});