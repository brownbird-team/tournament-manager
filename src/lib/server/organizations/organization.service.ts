import z from "zod";
import type { OrganizationRepository } from "./organization.repository";
import type { User } from "../users/user.entity";
import { FormError, UserError } from "../utils/errors";
import { Organization } from "./organization.entity";

export class OrganizationService {
    constructor(
        private orgRepo: OrganizationRepository
    ) {}

    async createOrganization(owner: User, data: unknown): Promise<Organization> {
        const schema = z.object({
            name: z
                .string()
                .min(4)
                .max(30),
            slug: z
                .string()
                .min(4)
                .max(30)
                .transform(encodeURIComponent),
            description: z
                .string()
                .max(800)
                .optional(),
        });

        const result = schema.safeParse(data);

        if (!result.success)
            throw FormError.fromZodError(result.error);

        const org = Organization.create(result.data);

        await FormError.throwOnUserError([ 'slug' ],
            this.orgRepo.save(org)
        );

        await this.orgRepo.addOwner(org, owner);

        return org;
    }

    async saveOrgSettings(data: unknown) {
        const schema = z.object({
            id: z
                .string(),
            name: z
                .string()
                .min(4)
                .max(30),
            slug: z
                .string()
                .min(4)
                .max(30)
                .transform(encodeURIComponent),
            description: z
                .string()
                .max(800)
                .optional(),
        });

        const result = schema.safeParse(data);

        if (!result.success)
            throw FormError.fromZodError(result.error);

        const org = await this.orgRepo.findById(result.data.id);

        if (!org) // TODO: this should be handled somehow...
            throw new UserError('Not found', 404);

        org.name = result.data.name;
        org.slug = result.data.slug;
        org.description = result.data.description;

        await FormError.throwOnUserError([ 'slug' ],
            this.orgRepo.save(org)
        );
    }
}