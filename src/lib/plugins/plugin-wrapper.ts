import { isWidgetHandlerAnon } from './widget-handler';

import type { StringKeys } from "#lib/types.ts";
import type { Plugin, PluginWrapper } from './plugin';
import type { PluginUserRecord, PluginUserRecordRaw } from "./plugin-user";
import type { WidgetPack, WidgetPackConfig, WidgetPackRenderSpec } from './widget';
import type { WidgetArea } from './widget-area';

import type {
    PluginAuthConfig,
    PluginAuthRefresh,
    PluginAuthRequest,
    PluginAuthSystemInfo
} from '#lib/plugins/plugin-auth.ts';

export class PluginWrapperImpl<
    U, W extends WidgetPackConfig, P extends Plugin<U, W>
> implements PluginWrapper<W> {

    private readonly plugin: P;
    private readonly widgetIdSet: Set<StringKeys<W>>;

    constructor(
        plugin: P,
        widgetPack: WidgetPack<W>,
    ) {
        this.plugin = plugin;
        this.widgetIdSet = new Set(
            Object.keys(widgetPack.widgets).filter(wId => typeof(wId) === 'string')
        ) as Set<StringKeys<W>>;
    }

    private parseUserRecord(user: PluginUserRecordRaw): PluginUserRecord<U> {
        if (user.userTypeId !== this.plugin.userTypeId)
            throw new Error(
                `Unable to process plugin user data: ` +
                `received "${user.userTypeId}" ` +
                `while expecting "${this.plugin.userTypeId}"`
            );

        return user as PluginUserRecord<U>;
    }

    getTitle() {
        return this.plugin.title;
    }

    getWidgetTitle(wId: StringKeys<W>) {
        return this.plugin.widgets[wId].title;
    };

    hasWidget(wId: string): wId is StringKeys<W> {
        return (this.widgetIdSet as Set<string>).has(wId);
    }

    getWidgetList(area: WidgetArea): StringKeys<W>[] {
        const wIds: StringKeys<W>[] = [];

        for (const wId of this.widgetIdSet) {
            if (this.plugin.widgets[wId].area === area)
                wIds.push(wId);
        }

        return wIds;
    };

    prepareWidget(
        wId: StringKeys<W>,
        systemInfo: PluginAuthSystemInfo,
        userRaw?: PluginUserRecordRaw
    ): WidgetPackRenderSpec<W> | null {
        const widget = this.plugin.widgets[wId];

        if (isWidgetHandlerAnon(widget)) {
            return { wId, props: widget.prepare({ system: systemInfo }) };
        }

        if (!userRaw)
            return null;
            
        return {
            wId,
            props: widget.prepare({
                system: systemInfo,
                user: this.parseUserRecord(userRaw).data,
            }),
        };
    }

    handleAuthSetup(): PluginAuthConfig {
        return this.plugin.hooks.authSetup();
    }

    async handleAuthRequest(auth: PluginAuthRequest): Promise<PluginUserRecordRaw> {
        return {
            userTypeId: this.plugin.userTypeId,
            data: await this.plugin.hooks.authRequest(auth),
        };
    }

    async handleAuthRefresh(auth: PluginAuthRefresh, userRaw: PluginUserRecordRaw): Promise<PluginUserRecordRaw> {
        const user = this.parseUserRecord(userRaw);

        if (!this.plugin.hooks.authRefresh)
            return user;

        return {
            userTypeId: this.plugin.userTypeId,
            data: await this.plugin.hooks.authRefresh(auth, user),
        };
    }
}

export const definePlugin = <U>() =>
    <
        W extends WidgetPackConfig,
        P extends Plugin<U, W>
    >(widgetPack: WidgetPack<W>, plugin: P): PluginWrapper<W> =>
        new PluginWrapperImpl<U, W, P>(plugin, widgetPack);