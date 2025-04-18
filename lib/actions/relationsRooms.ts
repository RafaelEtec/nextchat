"use server";

import {relationsRooms, rooms} from "@/database/schema";
import {db} from "@/database/drizzle";
import { and, eq, is, or } from "drizzle-orm";

export const addUsersToRoom = async (
    roomId: string,
    users: {
        userId: string,
        role: "USER" | "ADMIN"
    }[],
) => {
    try {
        for (let user of users) {
            const isAlreadyInRoom = await db
            .select()
            .from(relationsRooms)
            .where(
                and(
                    eq(relationsRooms.userId, user.userId as string),
                    eq(relationsRooms.roomId, roomId as string)
                )
            );
            if (isAlreadyInRoom.length > 0) { continue; }

            const add = await db
            .insert(relationsRooms)
            .values({
                userId: user.userId,
                roomId: roomId,
                access: user.role,
            });
            if (!add) {
                return {
                    success: false,
                    messageHeader: "Opa...",
                    message: "Error ao adicionar usuário à sala",
                }
            }
        }
        return {
            success: true,
            messageHeader: "Boa!",
            message: "Usuários adicionados à sala com sucesso",
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            messageHeader: "Opa...",
            message: "Error ao adicionar usuários à sala: " + error,
        }
    }
}