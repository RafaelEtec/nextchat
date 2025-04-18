"use server";

import {relationsGroups, users} from "@/database/schema";
import {db} from "@/database/drizzle";
import { and, eq, is, or } from "drizzle-orm";

export const addUsersToGroup = async (
    groupId: string,
    users: {
        userId: string,
        role: "USER" | "ADMIN"
    }[],
) => {
    try {
        for (let user of users) {
            const isAlreadyInGroup = await db
            .select()
            .from(relationsGroups)
            .where(
                and(
                    eq(relationsGroups.userId, user.userId as string),
                    eq(relationsGroups.groupId, groupId as string)
                )
            );
            if (isAlreadyInGroup.length > 0) { continue; }

            const add = await db
            .insert(relationsGroups)
            .values({
                userId: user.userId,
                groupId: groupId,
                role: user.role,
            });
            if (!add) {
                return {
                    success: false,
                    messageHeader: "Opa...",
                    message: "Error ao adicionar usuário ao grupo",
                }
            }
        }
        return {
            success: true,
            messageHeader: "Boa!",
            message: "Usuários adicionados ao grupo com sucesso",
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            messageHeader: "Opa...",
            message: "Error ao adicionar usuários ao grupo: " + error,
        }
    }
}