import z from "zod";
import type { OrganizationRepository } from "./organization.repository";
import type { User } from "../users/user.entity";
import { FormError, UserError } from "../utils/errors";
import { Organization } from "./organization.entity";
import type { ImageRepository } from "../images/image-repository";

export class OrganizationService {
    constructor(
        private orgRepo: OrganizationRepository,
        private imageRepo: ImageRepository,
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
            image: z
                .file()
                .optional(),
        });

        const result = schema.safeParse(data);

        if (!result.success)
            throw FormError.fromZodError(result.error);

        const org = Organization.create({
            name: result.data.name,
            slug: result.data.slug,
            description: result.data.description,
        });

        if (result.data.image && result.data.image.size > 0) {
            // TODO: handle errors
            const hash = await this.imageRepo.save(result.data.image);
            org.image = hash;
        }

        await FormError.throwOnUserError([ 'slug' ],
            this.orgRepo.save(org)
        );

        await this.orgRepo.addOwner(org, owner);
        return org;
    }

    async saveOrgSettings(org: Organization, data: unknown) {
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
            image: z
                .file()
                .optional(),
        });

        const result = schema.safeParse(data);

        if (!result.success)
            throw FormError.fromZodError(result.error);

        const newOrg = Organization.clone(org);

        newOrg.name = result.data.name;
        newOrg.slug = result.data.slug;
        newOrg.description = result.data.description;

        if (result.data.image && result.data.image.size > 0) {
            // TODO: handle errors
            newOrg.image = await this.imageRepo.save(result.data.image);
        }

        await FormError.throwOnUserError([ 'slug' ],
            this.orgRepo.save(newOrg)
        );
    }
}