import { genUUID } from '#lib/server/utils.ts';

export interface UserCreateProps {
    username: string,
    bio?: string,
    image?: string,
}

export class User {
    constructor(
        public readonly id: string,
        public username: string,
        public bio?: string,
        public image?: string,
    ) {}

    getImageUrl() {
        throw new Error('Not implemented yet');
    }

    static create(data: UserCreateProps) {
        return new User(
            genUUID(),
            data.username,
            data.bio,
            data.image,
        );
    }
}