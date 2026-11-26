import { genToken, genUUID } from '#lib/server/utils/generators.ts';

export interface OrganizationCreateProps {
    slug: string;
    name: string;
    image?: string;
    description?: string;
}

export class Organization {
    constructor(
        public readonly id: string,
        public name: string,
        public slug: string,
        public apiToken: string,
        public image?: string,
        public description?: string,
    ) {}

    regenerateApiToken() {
        this.apiToken = genToken();
    }

    getUrl() {
        return `/org/${this.slug}`;
    }

    getImageUrl() {
        if (this.image)
            return `/images/${this.image}`;

        const num = parseInt(this.id.slice(-1), 16) % 4;
        return `/default-profile-images/${num}.svg`;
    }

    static create(data: OrganizationCreateProps) {
        return new Organization(
            genUUID(),
            data.name,
            data.slug,
            genToken(),
            data.image,
            data.description,
        );
    }

    static clone(org: Organization) {
        return new Organization(
            org.id,
            org.name,
            org.slug,
            org.apiToken,
            org.image,
            org.description,
        );
    }
}