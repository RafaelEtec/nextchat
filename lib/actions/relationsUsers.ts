"use server";

import {relationsUsers, users} from "@/database/schema";
import {db} from "@/database/drizzle";
import { and, eq, is, or } from "drizzle-orm";

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
            if (isAlreadyFriend[0].status === "ACCEPTED") {
                return {
                    success: false,
                    message: "Você já é amigo desse usuário!",
                }
            } else {
                return {
                    success: false,
                    message: "Você já enviou um pedido à ele!",
                }
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
                message: "Error ao convidar",
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
            message: "Error ao convidar",
        }
    }
}

export async function findSolicitacoesById(id: string) {
    try {
        const solicitacoes = await db
        .select({
            userId: relationsUsers.userId,
            friendId: relationsUsers.friendId,
            status: relationsUsers.status,
            user: {
                id: users.id,
                name: users.name,
                email: users.email,
                image: users.image,
                createdAt: users.createdAt,
            },
        })
        .from(relationsUsers)
        .innerJoin(users, eq(relationsUsers.friendId, users.id))
        .where(
            and(
                eq(relationsUsers.userId, id),
                or (
                    eq(relationsUsers.status, "PENDING"),
                    eq(relationsUsers.status, "WAITING")
                )
            )
        );

        if (solicitacoes.length === 0) {
            return null;
        }

        return JSON.parse(JSON.stringify(solicitacoes));
    } catch (error) {
        console.log(error);
        return null;
    }
}