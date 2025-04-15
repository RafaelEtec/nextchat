"use server";

import {users} from "@/database/schema";
import {db} from "@/database/drizzle";
import { eq } from "drizzle-orm";

export const findUserByEmail = async (params: InviteByEmailParams) => {
    const { email } = params;

    try {
        const found = await db
        .select({users})
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

        if (found.length === 0) {
            return {
                success: false,
                message: "Ops... Usuário não encontrado!",
            }
        }

        return {
            success: null,
            data: JSON.parse(JSON.stringify(found[0].users)),
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Ops... Error ao encontrar usuário",
        }
    }
}