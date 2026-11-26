import type { PluginUserDataRaw } from "#lib/plugins/plugin-user.ts";
import type { PluginRegistry, PluginRegistryConfig } from "#lib/plugins/plugin.ts";
import type { WidgetRegistryConfig } from "#lib/plugins/widget.ts";
import type { AuthService } from "../auth/auth.service";
import type { UserConnectionRepository } from "../users/user-connection.repository";
import type { User } from "../users/user.entity";

export class WidgetService<
    W extends WidgetRegistryConfig,
    P extends PluginRegistryConfig<W>
> {
    constructor(
        private authService: AuthService<W, P>,
        private pluginRegistry: PluginRegistry<W, P>,
        private userConnRepo: UserConnectionRepository,
    ) {}

    getLoginWidgets() {
        const widgetIds = 
            this.pluginRegistry.getWidgetList('login');

        return this.pluginRegistry.prepareWidgets(
            widgetIds,
            this.authService.getSystemInfo()
        );
    }

    async getConnectionWidgets(user: User) {
        const conns = await this.userConnRepo.findByUser(user);

        const pluginUserData:
            PluginUserDataRaw = {}

        for (const conn of conns) {
            pluginUserData[conn.pluginId] = conn.pluginData;
        }

        const widgetIds =
            this.pluginRegistry.getWidgetList('connections');

        return this.pluginRegistry.prepareWidgets(
            widgetIds,
            this.authService.getSystemInfo(),
            pluginUserData
        );
    }
}