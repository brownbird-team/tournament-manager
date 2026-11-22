export class OAuthUserData {
    constructor(
        public readonly sub: string,
        public readonly accessToken: string,
        public readonly expiresAt?: Date,
        public readonly refreshToken?: string,
    ) {}
}

