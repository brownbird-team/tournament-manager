import { Organization } from './organization.entity';
import * as schema from '#lib/server/db/schema.ts';
import type { Database } from "#lib/server/db/types.ts";
import { and, eq } from 'drizzle-orm';
import type { User } from '../users/user.entity';
import { catchConstraint } from '../utils/catch-constraint';
import { UniqueError } from '../utils/errors';

class OrganizationMapper {
    static toEntity(data: typeof schema.org.$inferSelect): Organization {
        return new Organization(
            data.orgId,
            data.name,
            data.slug,
            data.apiToken,
            data.image ?? undefined,
            data.description ?? undefined,
        );
    }

    static toDatabase(org: Organization): typeof schema.org.$inferInsert {
        return {
            orgId: org.id,
            name: org.name,
            slug: org.slug,
            apiToken: org.apiToken,
            image: org.image,
            description: org.description,
        };
    }
}

export class OrganizationRepository {
    constructor(
        private db: Database,
    ) {}

    async save(org: Organization) {
        const orgDb = OrganizationMapper.toDatabase(org);

        const status = await catchConstraint([ 'org_slug_unique' ], 
            this.db.insert(schema.org)
                .values(orgDb)
                .onConflictDoUpdate({ 
                    target: schema.org.orgId, 
                    set: orgDb 
                })
        );

        if (!status.ok)
            throw new UniqueError('This slug is already taken');
    }

    async delete(org: Organization) {
        await this.db.delete(schema.org)
            .where(eq(schema.org.orgId, org.id));
    }

    async addOwner(org: Organization, user: User) {
        await this.db.insert(schema.orgOwner)
            .values({ orgId: org.id, userId: user.id })
            .onConflictDoNothing();
    }

    async removeOwner(org: Organization, user: User) {
        await this.db.delete(schema.orgOwner)
            .where(and(
                eq(schema.orgOwner.orgId, org.id), 
                eq(schema.orgOwner.userId, user.id)
            ));
    }

    async findById(id: string): Promise<Organization | null> {
        const res = await this.db.select()
            .from(schema.org)
            .where(eq(schema.org.orgId, id));

        return res.length > 0 ? OrganizationMapper.toEntity(res[0]) : null;
    }

    async findBySlug(slug: string): Promise<Organization | null> {
        const res = await this.db.select()
            .from(schema.org)
            .where(eq(schema.org.slug, slug));

        return res.length > 0 ? OrganizationMapper.toEntity(res[0]) : null;
    }

    async findByOwner(user: User): Promise<Organization[]> {
        const res = await this.db.select()
            .from(schema.org)
            .innerJoin(schema.orgOwner, 
                eq(schema.org.orgId, schema.orgOwner.orgId)
            )
            .where(eq(schema.orgOwner.userId, user.id));

        return res.map(rec => OrganizationMapper.toEntity(rec.organization));
    }
}