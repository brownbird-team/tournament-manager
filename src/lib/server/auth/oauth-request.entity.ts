import * as client from 'openid-client';
import { OAUTH_REQUEST_LIFETIME } from '$app/env/private'

interface OAuthRequestCreateProps {
    useNonce: boolean;
}

export class OAuthRequest {
    constructor(
        public readonly challenge: string,
        public readonly verifier: string,
        public readonly createdAt: Date,
        public readonly nonce?: string,
    ) {}

    valid() {
        const d = new Date();
        d.setSeconds(d.getSeconds() - OAUTH_REQUEST_LIFETIME);
        return this.createdAt > d;
    }

    static async create(data: OAuthRequestCreateProps) {
        const verifier = client.randomPKCECodeVerifier();

        return new OAuthRequest(
            await client.calculatePKCECodeChallenge(verifier),
            verifier,
            new Date(),
            data.useNonce ? client.randomNonce() : undefined,
        );
    }
}