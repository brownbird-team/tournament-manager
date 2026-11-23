import type { StringKeys } from "#lib/types.ts";
import type { PluginRegistry, PluginRegistryConfig } from "./plugin";
import type { PluginAuthSystemInfo } from "./plugin-auth";
import type { PluginUserDataRaw } from "./plugin-user";
import type { WidgetIdentifier, WidgetRegistry, WidgetRegistryConfig, WidgetRenderSpec } from "./widget";
import type { WidgetArea } from "./widget-area";

export class PluginRegistryImpl<
    W extends WidgetRegistryConfig, C extends PluginRegistryConfig<W>
> implements PluginRegistry<W, C> {

    private readonly plugins: C;
    private readonly widgetPackIdSet: Set<StringKeys<W>>;

    constructor(widgetRegistry: WidgetRegistry<W>, config: C) {
        this.plugins = config;
        this.widgetPackIdSet = new Set(
            Object.keys(widgetRegistry.packs).filter(pId => typeof(pId) === 'string')
        ) as Set<StringKeys<W>>;
    }

    hasPlugin(pId: string): pId is StringKeys<W> {
        return (this.widgetPackIdSet as Set<string>).has(pId);
    }

    getPlugin<K extends StringKeys<W>>(pId: K): C[K] {
        return this.plugins[pId];
    }

    getPluginList(): StringKeys<W>[] {
        return Array.from(this.widgetPackIdSet);
    }

    getWidgetList(
        area: WidgetArea,
        plugins?: StringKeys<W> | StringKeys<W>[]
    ): WidgetIdentifier[] {
        const widgetIdentifiers: WidgetIdentifier[] = [];

        const pIds = typeof(plugins) === 'undefined' ? 
            this.getPluginList() :
                Array.isArray(plugins) ? plugins : [plugins];

        for (const pId of pIds) {
            const widgets = this.getPlugin(pId).getWidgetList(area);

            widgetIdentifiers.push(
                ...widgets.map((wId): WidgetIdentifier => [pId, wId])
            );
        }

        return widgetIdentifiers;
    };

    prepareWidgets(
        widgets: WidgetIdentifier[],
        systemInfo: Record<StringKeys<W>, PluginAuthSystemInfo>,
        user?: PluginUserDataRaw
    ): WidgetRenderSpec<W>[] {
        const spec: WidgetRenderSpec<W>[] = [];

        for (const [pId, wId] of widgets) {
            if (!this.hasPlugin(pId))
                continue;

            const plugin = this.getPlugin(pId);

            if (!plugin.hasWidget(wId))
                continue;

            const wSpec = plugin.prepareWidget(wId, systemInfo[pId], user?.[pId]);

            if (!wSpec)
                continue;

            spec.push({ pId, ...wSpec });
        }

        return spec;
    }
}

export const definePluginRegistry = 
    <
        W extends WidgetRegistryConfig, 
        C extends PluginRegistryConfig<W>
    >(widgetRegistry: WidgetRegistry<W>, config: C): PluginRegistry<W, C> =>
        new PluginRegistryImpl<W, C>(widgetRegistry, config);