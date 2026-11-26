import type { User } from "../users/user.entity";
import type { UserSession } from "../users/user-session.entity";
import { redirect } from "@sveltejs/kit";

interface LocalsUserProps {
    user: User;
    userSession: UserSession;
}

export function requireAuth(
    locals: Partial<LocalsUserProps>
): asserts locals is LocalsUserProps {
    
    if (!locals.user || !locals.userSession)
        redirect(301, '/login');
}