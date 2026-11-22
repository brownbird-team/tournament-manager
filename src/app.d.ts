import type { UserSession } from "#lib/server/users/user-session.entity.ts";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		interface Locals {
			userSession?: UserSession;
		}
	}
}

export {};
