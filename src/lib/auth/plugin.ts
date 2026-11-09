import type { FetchBody, UserInfoResponse } from "openid-client";

export interface AuthPluginConfig {
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

export interface AuthPluginRequest {
    userInfo: UserInfoResponse;
    fetch: (url: URL, options?: FetchOptions) => Promise<Response>;
}

// If tokens have expired null will be passed since
// new data cannot be fetched
export type AuthPluginRefresh = AuthPluginRequest | null;