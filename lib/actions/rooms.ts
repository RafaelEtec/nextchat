"use server";

import {rooms} from "@/database/schema";
import {db} from "@/database/drizzle";
import { and, eq, is, or } from "drizzle-orm";

export async function createRoom(
    groupId: string,
    name: string,
    description: string,
) {
    try {
        if (!groupId || !name || !description) { throw new Error("groupId, name e description são obrigatórios.");}

        const room = await db
        .insert(rooms)
        .values({
            id: groupId as string,
            name: name as string,
            description: description as string,
            access: "USER",
        })
        .returning({ id: rooms.id });

        if (!room) {
            return {
                success: false,
                messageHeader: "Opa...",
                message: "Error ao criar sala",
            }
        }

        return {
            id: room[0].id,
            success: true,
            messageHeader: "Boa!",
            message: "Sala criada com sucesso",
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            messageHeader: "Opa...",
            message: "Error ao criar sala: " + error,
        }
    }
}