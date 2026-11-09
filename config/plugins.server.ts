import { definePluginRegistry } from '#plugins';

import widgetRegistry from './plugins.client';
import example from '#plugins/example/example.server.ts';

export default definePluginRegistry(widgetRegistry, {
    example,
});