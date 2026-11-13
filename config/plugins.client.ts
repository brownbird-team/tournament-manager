import type { WidgetRegistryConfig } from '#plugins/core/types.ts';

import example from '#plugins/example/example.client.ts';
import example2 from '#plugins/example2/example2.client.ts';

export default {
    example,
    example2,
} satisfies WidgetRegistryConfig;