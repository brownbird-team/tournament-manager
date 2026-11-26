import { genUUID } from '#lib/server/utils/generators.ts';

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
        if (this.image)
            throw new Error("Not implemented yet, user shouldn't have image");

        const num = parseInt(this.id.slice(-1), 16) % 4;
        return `/default-profile-images/${num}.svg`;
    }

    static create(data: UserCreateProps) {
        return new User(
            genUUID(),
            data.username,
            data.bio,
            data.image,
        );
    }

    static clone(user: User) {
        return new User(
            user.id,
            user.username,
            user.bio,
            user.image
        );
    }
}