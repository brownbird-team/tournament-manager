import type { FetchBody, UserInfoResponse } from "openid-client";

export interface PluginAuthConfig {
    server: string;
    clientId: string;
    clientSecret: string;
    scope: string[];
}

export interface FetchOptions {
    method?: string;
    body?: FetchBody;
    headers?: Headers;
}

export interface PluginAuthRequest {
    userInfo: UserInfoResponse;
    fetch: (url: URL, options?: FetchOptions) => Promise<Response>;
}

// If tokens have expired null will be passed since
// new data cannot be fetched
export type PluginAuthRefresh = PluginAuthRequest | null;