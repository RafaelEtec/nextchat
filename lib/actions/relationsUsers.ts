"use server";

import {relationsUsers} from "@/database/schema";
import {db} from "@/database/drizzle";

export const inviteByEmail = async (params: InviteByEmailParams) => {
    const {userId, friendId} = params;
    console.log("friendId: " + friendId)
    console.log("userId: " + userId)
    try {
        if (!userId || !friendId) {
            throw new Error("userId e friendId são obrigatórios.");
        }

        console.log(friendId)
        console.log(userId)
        return true;


        const invite1 = await db
            .insert(relationsUsers)
            .values({
                userId: userId as string,
                friendId: friendId as string,
                status: "PENDING",
            })
            .returning();

        return true;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Ops... Error ao convidar usuário pelo E-mail",
        }
    }
}