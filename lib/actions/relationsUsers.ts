"use server";

import {relationsUsers} from "@/database/schema";
import {db} from "@/database/drizzle";
import { and, eq, is } from "drizzle-orm";

export const inviteByEmail = async (params: InviteByEmailParams) => {
    const {userId, friendId} = params;

    try {
        if (!userId || !friendId) { throw new Error("userId e friendId são obrigatórios.");}

        const isAlreadyFriend = await db
        .select()
        .from(relationsUsers)
        .where(
            and(
                eq(relationsUsers.userId, userId as string),
                eq(relationsUsers.friendId, friendId as string)
            )
        );

        if (isAlreadyFriend.length > 0) {
            console.log("user " + isAlreadyFriend[0].userId);
            console.log("friend " + isAlreadyFriend[0].friendId);
            return {
                success: false,
                message: "Ops... Você já é amigo desse usuário!",
            }
        }

        const invite1 = await db
        .insert(relationsUsers)
        .values({
            userId: userId as string,
            friendId: friendId as string,
            status: "WAITING",
        });

        const invite2 = await db
        .insert(relationsUsers)
        .values({
            userId: friendId as string,
            friendId: userId as string,
            status: "PENDING",
        });

        if (!invite1 || !invite2) {
            return {
                success: false,
                message: "Ops... Error ao convidar",
            }
        }
        return {
            success: true,
            message: "Convite enviado com sucesso!",
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Ops... Error ao convidar",
        }
    }
}