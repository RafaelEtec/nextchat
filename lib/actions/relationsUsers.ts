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
                    messageHeader: "Opa...",
                    message: "Você já é amigo desse usuário!",
                }
            } else {
                return {
                    success: false,
                    messageHeader: "Opa...",
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
                messageHeader: "Opa...",
                message: "Error ao convidar",
            }
        }
        return {
            success: true,
            messageHeader: "Boa!",
            message: "Convite enviado com sucesso",
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            messageHeader: "Opa...",
            message: "Error ao convidar: \n" + error,
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

export async function respondInvite(
    userId: string,
    friendId: string,
    action: string,
) {
    var message = ""
    var messageHeader = ""

    try {
        if (action !== "ACCEPT" && action !== "DECLINE") {
            return {
                success: false,
                messageHeader: "Opa...",
                message: "Ação inválida",
            }
        }

        if (action === "ACCEPT") {
            const update1 = await db
            .update(relationsUsers)
            .set({
                status: "ACCEPTED",
            })
            .where(
                and(
                    eq(relationsUsers.userId, userId as string),
                    eq(relationsUsers.friendId, friendId as string)
                )
            );

            const update2 = await db
            .update(relationsUsers)
            .set({
                status: "ACCEPTED",
            })
            .where(
                and(
                    eq(relationsUsers.userId, friendId as string),
                    eq(relationsUsers.friendId, userId as string)
                )
            );

            if (!update1 || !update2) {
                return {
                    success: false,
                    messageHeader: "Opa...",
                    message: "Erro ao aceitar convite",
                }
            }
        } else {
            const update1 = await db
            .delete(relationsUsers)
            .where(
                and(
                    eq(relationsUsers.userId, userId as string),
                    eq(relationsUsers.friendId, friendId as string)
                )
            );

            const update2 = await db
            .delete(relationsUsers)
            .where(
                and(
                    eq(relationsUsers.userId, friendId as string),
                    eq(relationsUsers.friendId, userId as string)
                )
            );

            if (!update1 || !update2) {
                return {
                    success: false,
                    messageHeader: "Opa...",
                    message: "Erro ao recusar convite",
                }
            }
        }
        if (action === "ACCEPT") {
            messageHeader = "Boa!"
            message = "Convite aceito com sucesso"
        } else {
            messageHeader = "Pois é...",
            message = "Convite recusado com sucesso"
        }
        return {
            success: true,
            messageHeader,
            message: message,
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            messageHeader: "Opa...",
            message: "Erro ao enviar convite: " + error,
        }
    }
}

export async function findAmigosById(id: string) {
    try {
        const amigos = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email,
            image: users.image,
            createdAt: users.createdAt,
        })
        .from(relationsUsers)
        .innerJoin(users, eq(relationsUsers.friendId, users.id))
        .where(
            and(
                eq(relationsUsers.userId, id),
                eq(relationsUsers.status, "ACCEPTED")
            )
        );

        if (amigos.length === 0) {
            return null;
        }

        return JSON.parse(JSON.stringify(amigos));
    } catch (error) {
        console.log(error);
        return null;
    }
}