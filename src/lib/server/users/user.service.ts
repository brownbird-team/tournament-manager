import z from "zod";
import { User } from "./user.entity";
import type { UserRepository } from "./user.repository";
import { FormError } from "../utils/errors";
import type { UserConnectionRepository } from "./user-connection.repository";
import type { PluginRegistry } from "#plugins";
import type { WidgetRegistryConfig } from "#lib/plugins/widget.ts";
import type { PluginRegistryConfig } from "#lib/plugins/plugin.ts";
import type { UserSession } from "./user-session.entity";
import type { AuthService } from "../auth/auth.service";
import type { ImageRepository } from "../images/image-repository";

export class UserService<
    W extends WidgetRegistryConfig,
    P extends PluginRegistryConfig<W>
> {
    constructor(
        private userRepo: UserRepository,
        private userConnRepo: UserConnectionRepository,
        private pluginRegistry: PluginRegistry<W, P>,
        private authService: AuthService<W, P>,
        private imageRepo: ImageRepository,
    ) {}

    async saveUserSettings(user: User, raw: unknown) {
        const schema = z.object({
            username: z
                .string()
                .min(4)
                .max(30),
            bio: z
                .string()
                .max(800)
                .optional(),
            image: z
                .file()
                .optional(),
        });

        const result = schema.safeParse(raw);

        if (!result.success)
            throw FormError.fromZodError(result.error);

        const newUser = User.clone(user);

        newUser.bio = result.data.bio;
        newUser.username = result.data.username;
        
        if (result.data.image && result.data.image.size > 0) {
            // TODO: handle errors
            const hash = await this.imageRepo.save(result.data.image);
            newUser.image = hash;
        }

        await FormError.throwOnUserError([ 'username' ],
            this.userRepo.save(newUser)
        );
    }

    async getDisconnectedPlugins(user: User) {
        const connected = new Set(
            (await this.userConnRepo.findByUser(user)).map(conn => conn.pluginId),
        );

        return this.pluginRegistry.getPluginListWithTitles()
            .filter(
                plugin => !connected.has(plugin.pId)
            )
            .map(plugin => ({
                ...plugin,
                loginUrl: this.authService.genLoginUri(plugin.pId),
            }));
    }

    async getConnectedPlugins(user: User, session?: UserSession) {
        const connected = new Set(
            (await this.userConnRepo.findByUser(user)).map(conn => conn.pluginId),
        );

        return this.pluginRegistry.getPluginListWithTitles()
            .filter(plugin => 
                connected.has(plugin.pId)
            )
            .map(plugin => ({
                ...plugin,
                disconnectable: !session || plugin.pId !== session.pluginId,
            }));
    }

    async disconnectPlugin(user: User, session: UserSession, pluginId: string) {
        if (session.pluginId === pluginId)
            return;

        const conn =
            await this.userConnRepo.findByUserAndPlugin(user, pluginId);

        if (conn)
            await this.userConnRepo.delete(conn);
    }
}