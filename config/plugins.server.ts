import type widgetBundles from './plugins.client';
import type { PluginRegistryConfig } from "#plugins/core/types.ts";

import example from '#plugins/example/example.server.ts';
import example2 from '#plugins/example2/example2.server.ts';

export default {
    example,
    example2,
} satisfies PluginRegistryConfig<typeof widgetBundles>;