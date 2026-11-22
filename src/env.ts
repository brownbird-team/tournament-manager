import { z } from 'zod';
import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	APP_NAME: {
		public: true,
		schema: z
			.string()
			.default('BrownBird Tournament Manager'),
	},
	DATABASE_URL: {
		description: 'The database connection string.',
	},
	OAUTH_REQUEST_LIFETIME: {
		schema: z
			.string()
			.regex(/^\d+$/)
			.transform(Number)
			.default(15*60),
	},
	ORIGIN: {
		schema: z
			.url()
			.transform(url => url.replace(/\/+$/, ''))
			.default('http://localhost:5173'),
	},

	BBAUTH_CLIENT_ID: {
		schema: z.string(),
	},
	BBAUTH_CLIENT_SECRET: {
		schema: z.string(),
	},
});
