import type { StringKeys } from "#lib/types.ts";

import type { 
    WidgetPack,
    WidgetPackConfig,
    WidgetRegistry,
    WidgetRegistryConfig,
    WidgetRenderable
} from "./widget";

export function defineWidgetPack<
    C extends WidgetPackConfig
>(config: C): WidgetPack<C> {
    return {
        widgets: config,
        has(key: string): key is StringKeys<C> {
            return Object.hasOwn(config, key);
        },
    };
}

export function defineWidgetRegistry<
    C extends WidgetRegistryConfig
>(config: C): WidgetRegistry<C> {
    return {
        packs: config,
        has(key: string): key is StringKeys<C> {
            return Object.hasOwn(config, key);
        },

        resolve(spec): WidgetRenderable<C> {
            const { pId, wId, props } = spec;

            return {
                props,
                // This shouldn't really pass type check, but if noUncheckedIndexedAccess
                // if off it will. However it is still safe since spec only allows
                // pairs of pId and wId that exist within registry
                // 
                // roko 10mins later: widgets are any on WidgetRegistryConfig, I don't
                // have mental capacity to figure out how to write this other way at
                // the moment
                component: this.packs[pId].widgets[wId],
            }
        },
    }
}