import type { Database } from "../db/types";
import { OAuthRequest } from "./oauth-request.entity";
import * as schema from '#lib/server/db/schema.ts';
import { eq, lt } from "drizzle-orm";

import { OAUTH_REQUEST_LIFETIME } from '$app/env/private';

class OAuthRequestMapper {
    static toEntity(data: typeof schema.oauthRequest.$inferSelect): OAuthRequest {
        return new OAuthRequest(
            data.state,
            data.verifier,
            data.createdAt,
            data.nonce ?? undefined,
        );
    }

    static toDatabase(req: OAuthRequest): typeof schema.oauthRequest.$inferInsert {
        return {
            state: req.state,
            verifier: req.verifier,
            createdAt: req.createdAt,
            nonce: req.nonce,
        };
    }
}

export class OAuthRequestRepository {
    constructor(
        private db: Database,
    ) {}

    async save(req: OAuthRequest) {
        const reqDb = OAuthRequestMapper.toDatabase(req);

        await this.db.insert(schema.oauthRequest)
            .values(reqDb)
            .onConflictDoUpdate({
                target: schema.oauthRequest.state,
                set: reqDb,
            });
    }

    async delete(req: OAuthRequest) {
        await this.db.delete(schema.oauthRequest)
            .where(eq(schema.oauthRequest.state, req.state));
    }

    async findByState(state: string): Promise<OAuthRequest | null> {
        const req = await this.db.select()
            .from(schema.oauthRequest)
            .where(eq(schema.oauthRequest.state, state));

        return req.length > 0 ? OAuthRequestMapper.toEntity(req[0]) : null;
    }

    // Remove all expired requests
    async prune() {
        const d = new Date();
        d.setSeconds(d.getSeconds() - OAUTH_REQUEST_LIFETIME);

        await this.db.delete(schema.oauthRequest)
            .where(lt(schema.oauthRequest.createdAt, d));
    }
}