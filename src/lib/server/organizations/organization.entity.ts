import { genToken, genUUID } from '#lib/server/utils/generators.ts';

export interface OrganizationCreateProps {
    slug: string;
    name: string;
    description?: string;
}

export class Organization {
    constructor(
        public readonly id: string,
        public name: string,
        public slug: string,
        public apiToken: string,
        public description?: string,
    ) {}

    regenerateApiToken() {
        this.apiToken = genToken();
    }

    getUrl() {
        return `/org/${this.slug}`;
    }

    static create(data: OrganizationCreateProps) {
        return new Organization(
            genUUID(),
            data.name,
            data.slug,
            genToken(),
            data.description,
        );
    }

    static clone(org: Organization) {
        return new Organization(
            org.id,
            org.name,
            org.slug,
            org.apiToken,
            org.description,
        );
    }
}