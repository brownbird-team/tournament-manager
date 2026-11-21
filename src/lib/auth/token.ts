export class OAuthToken {
    constructor(
        public readonly token: string,
        public readonly expiresAt: Date,
    ) {}
}

export class OAuthTokenPair {
    constructor(
        public access: OAuthToken,
        public refresh?: OAuthToken,
    ) {}

    toFlat(): OAuthTokenPairFlat {
        return {
            oAuthAccessToken: this.access.token,
            oAuthAccessExpiresAt: this.access.expiresAt,
            oAuthRefreshToken: this?.refresh?.token,
            oAuthRefreshExpiresAt: this?.refresh?.expiresAt,
        };
    }

    static fromFlat(flat: OAuthTokenPairFlat) {
        const accessToken =
            new OAuthToken(flat.oAuthAccessToken, flat.oAuthAccessExpiresAt);

        const refreshToken =
            (flat.oAuthRefreshToken && flat.oAuthRefreshExpiresAt) ?
                new OAuthToken(flat.oAuthRefreshToken, flat.oAuthRefreshExpiresAt) :
                    undefined;

        return new OAuthTokenPair(accessToken, refreshToken);
    }
}

export interface OAuthTokenPairFlat {
    oAuthAccessToken: string;
    oAuthAccessExpiresAt: Date;
    oAuthRefreshToken?: string | null;
    oAuthRefreshExpiresAt?: Date | null;
}