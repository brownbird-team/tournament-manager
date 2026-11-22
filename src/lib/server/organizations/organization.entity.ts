import { genToken, genUUID } from '#lib/server/utils/generators.ts';

export interface OrganizationCreateProps {
    slug: string;
    description?: string;
}

export class Organization {
    constructor(
        public readonly id: string,
        public slug: string,
        public apiToken: string,
        public description?: string,
    ) {}

    regenerateApiToken() {
        this.apiToken = genToken();
    }

    static create(data: Organization) {
        return new Organization(
            genUUID(),
            data.slug,
            genToken(),
            data.description,
        );
    }
}