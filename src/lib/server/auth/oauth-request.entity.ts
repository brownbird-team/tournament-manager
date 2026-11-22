import * as client from 'openid-client';
import { OAUTH_REQUEST_LIFETIME } from '$app/env/private'
import { genState } from '../utils/generators';

interface OAuthRequestCreateProps {
    useNonce: boolean;
}

export class OAuthRequest {
    constructor(
        public readonly state: string,
        public readonly verifier: string,
        public readonly createdAt: Date,
        public readonly nonce?: string,
    ) {}

    valid() {
        const d = new Date();
        d.setSeconds(d.getSeconds() - OAUTH_REQUEST_LIFETIME);
        return this.createdAt > d;
    }

    async getChallenge() {
        return await client.calculatePKCECodeChallenge(this.verifier);
    }

    static create(data: OAuthRequestCreateProps) {
        const verifier = client.randomPKCECodeVerifier();

        return new OAuthRequest(
            genState(),
            verifier,
            new Date(),
            data.useNonce ? client.randomNonce() : undefined,
        );
    }
}