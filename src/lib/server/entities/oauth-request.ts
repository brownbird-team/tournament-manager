import * as client from 'openid-client';

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