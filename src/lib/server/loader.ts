import { db } from "./db";

// Plugins
import pluginRegistry from '#config/plugins.server.ts';

// Repositories
import { OAuthRequestRepository } from "./auth/oauth-request.repository";
import { OrganizationRepository } from "./organizations/organization.repository";
import { UserRepository } from "./users/user.repository";
import { UserConnectionRepository } from "./users/user-connection.repository";
import { UserSessionRepository } from "./users/user-session.repository";
import { ImageRepository } from "./images/image-repository";


// Services
import { AuthService } from "./auth/auth.service";
import { WidgetService } from "./widgets/widget.service";
import { UserService } from "./users/user.service";

// Repository instances
export const oAuthRequestRepo =
    new OAuthRequestRepository(db);

export const organisationRepo =
    new OrganizationRepository(db);

export const userRepo =
    new UserRepository(db);

export const userConnectionRepo =
    new UserConnectionRepository(db);
    
export const userSessionRepo =
    new UserSessionRepository(db);

export const imageRepo = 
    new ImageRepository()

// Service instances
export const authService = new AuthService(
    pluginRegistry,
    userRepo,
    userConnectionRepo,
    oAuthRequestRepo,
    userSessionRepo,
);

export const widgetService = new WidgetService(
    authService,
    pluginRegistry,
    userConnectionRepo,
);

export const userService = new UserService(
    userRepo,
    userConnectionRepo,
    pluginRegistry,
    authService,
);
