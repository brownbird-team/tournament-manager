import { string, type ZodError } from "zod";

/**
 * UserError
 * Couse of error is bad user request
 */

export class UserError extends Error {
    public httpCode: number;

    constructor(
        message: string,
        httpCode: number = 400
    ) {
        super(message);
        this.httpCode = httpCode;
    }
}

/**
 * InternalError
 * Something unexpected happend internally
 */

export class InternalError extends Error {}

/**
 * AuthError
 * User error in Auth system
 */

export class AuthError extends UserError {}

/**
 * UniqueError
 * Throwed by repos when expected unique index violation occurs
 */

export class UniqueError extends UserError {}

/**
 * FormError
 * Data provided to form is invalid in some way, contains per field error
 * messages
 */

export class FormError extends UserError {

    constructor(
        public issues: Record<string, string>, // field, message
    ) {
        super(
            Object.entries(issues).map(
                ([ field, message ]) => `${field}: ${message}`
            ).join(', ')
        );
    }

    static fromZodError(error: ZodError) {
        const errorMap = new Map<string, string>();

        error.issues.forEach(iss => {
            const key = iss.path.join('.') || '_';
            const agregate = errorMap.get(key);

            errorMap.set(key, 
                agregate ? `${agregate}, ${iss.message}` : iss.message
            );
        });

        return new FormError(
            Object.fromEntries(errorMap.entries())
        );
    }

    static async throwOnUserError<T>(
        fields: string[],
        promise: Promise<T>
    ): Promise<T> {
        try {
            return await promise;

        } catch (err) {
            if (!(err instanceof UserError))
                throw err;

            throw new FormError(
                Object.fromEntries(fields.map(field => [field, err.message]))
            );
        }
    }
}