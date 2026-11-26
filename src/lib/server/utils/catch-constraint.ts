import { DrizzleQueryError } from "drizzle-orm";
import pg from "postgres";

type ConstraintQueryResult<T> =
    { ok: true; result: T; } | { ok: false; constraint: string; };

export async function catchConstraint<T>(
    constraints: string[],
    promise: Promise<T>
): Promise<ConstraintQueryResult<T>> {
    try {
        return {
            ok: true,
            result: await promise,
        }

    } catch (err) {
        if (!(err instanceof DrizzleQueryError && err.cause instanceof pg.PostgresError))
            throw err;

        const pgErr = err.cause;
        const constraintCaught = constraints.find(c => c === pgErr.constraint_name);

        if (!constraintCaught)
            throw err;

        return {
            ok: false,
            constraint: constraintCaught,
        }
    }
}