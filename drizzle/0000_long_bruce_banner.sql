CREATE TABLE "oauth_request" (
	"challange" text PRIMARY KEY NOT NULL,
	"verifier" text NOT NULL,
	"nonce" text,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "oauth_request_verifier_unique" UNIQUE("verifier"),
	CONSTRAINT "oauth_request_nonce_unique" UNIQUE("nonce")
);
--> statement-breakpoint
CREATE TABLE "organization" (
	"organization_id" uuid PRIMARY KEY NOT NULL,
	"slug" varchar NOT NULL,
	"description" text,
	"api_token" text NOT NULL,
	CONSTRAINT "organization_slug_unique" UNIQUE("slug"),
	CONSTRAINT "organization_api_token_unique" UNIQUE("api_token")
);
--> statement-breakpoint
CREATE TABLE "organization_owner" (
	"organization_id" uuid,
	"user_id" uuid,
	CONSTRAINT "organization_owner_organization_id_user_id_pk" PRIMARY KEY("organization_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"bio" text,
	"profile_image" varchar,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "user_connection" (
	"user_id" uuid NOT NULL,
	"plugin_id" varchar NOT NULL,
	"plugin_data" json NOT NULL,
	"plugin_data_type_id" varchar NOT NULL,
	"oauth" text NOT NULL,
	"oauth_access_token" text NOT NULL,
	"oauth_expires_at" timestamp,
	"oauth_refresh_token" text,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "user_connection_user_id_plugin_id_pk" PRIMARY KEY("user_id","plugin_id"),
	CONSTRAINT "user_connection_plugin_id_oauth_unique" UNIQUE("plugin_id","oauth")
);
--> statement-breakpoint
CREATE TABLE "user_session" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"plugin_id" varchar NOT NULL,
	"oauth" text NOT NULL,
	"oauth_access_token" text NOT NULL,
	"oauth_expires_at" timestamp,
	"oauth_refresh_token" text,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_connection" ADD CONSTRAINT "user_connection_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_id_plugin_id_user_connection_user_id_plugin_id_fk" FOREIGN KEY ("user_id","plugin_id") REFERENCES "public"."user_connection"("user_id","plugin_id") ON DELETE no action ON UPDATE no action;