ALTER TABLE "organization" DROP CONSTRAINT "organization_slug_unique";--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "org_slug_unique" UNIQUE("slug");