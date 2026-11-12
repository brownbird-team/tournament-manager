import type widgetBundles from './plugins.client';
import type { PluginBundle } from "#plugins/core/types.ts";

import example from '#plugins/example/example.server.ts';

export default {
    example
} satisfies PluginBundle<typeof widgetBundles>;