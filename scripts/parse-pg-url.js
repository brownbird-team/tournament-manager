import { loadEnvFile } from "node:process";

loadEnvFile('.env')

if (!process.env.DATABASE_URL)
    throw new Error('DATABASE_URL is not set');

const url = new URL(process.env.DATABASE_URL);

if (!url.password)
    throw new Error('Database password is not set in the url');

const env = {
    POSTGRES_DB: url.pathname.replace('/', ''),

    POSTGRES_USER: url.username ?? 'bbtm',
    POSTGRES_PASSWORD: url.password,

    POSTGRES_HOST: url.hostname ?? '127.0.0.1',
    POSTGRES_PORT: url.port ?? '5432',
}

for (const [ key, value ] of Object.entries(env)) {
    console.log(`${key}="${decodeURIComponent(value)}"`);
}