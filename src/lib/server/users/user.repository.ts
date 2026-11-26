import * as schema from '#lib/server/db/schema.ts';
import type { Database } from '#lib/server/db/types.ts';
import { eq } from 'drizzle-orm';
import { User } from './user.entity';
import { catchConstraint } from '../utils/catch-constraint';
import { UniqueError } from '../utils/errors';

class UserMapper {
    static toEntity(data: typeof schema.user.$inferSelect): User {
        return new User(
            data.userId,
            data.username,
            data.bio ?? undefined,
            data.profileImage ?? undefined,
        );
    }

    static toDatabase(user: User): typeof schema.user.$inferInsert {
        return {
            userId: user.id,
            username: user.username,
            bio: user.bio,
            profileImage: user.image,
        };
    }
}

export class UserRepository {
    constructor(
        private db: Database
    ) {}

    async save(user: User) {
        const userDb = UserMapper.toDatabase(user);

        const status = 
            await catchConstraint([ 'user_username_unique' ],
                this.db.insert(schema.user)
                    .values(userDb)
                    .onConflictDoUpdate({
                        target: schema.user.userId,
                        set: userDb,
                    })
            );

        if (!status.ok)
            throw new UniqueError('This username is already taken');
    }

    async delete(user: User) {
        await this.db.delete(schema.user)
            .where(eq(schema.user.userId, user.id));
    }

    async findById(id: string): Promise<User | null> {
        const res = await this.db.select()
            .from(schema.user)
            .where(eq(schema.user.userId, id));

        return res.length > 0 ? UserMapper.toEntity(res[0]) : null;
    }

    async findByUsername(username: string) {
        const res = await this.db.select()
            .from(schema.user)
            .where(eq(schema.user.username, username));

        return res.length > 0 ? UserMapper.toEntity(res[0]) : null;
    }
}