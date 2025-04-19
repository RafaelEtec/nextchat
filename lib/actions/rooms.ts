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

export async function getRoomsByGroupId(groupId: string) {
    try {
        if (!groupId) { throw new Error("groupId é obrigatório.");}

        const roomsList = await db
        .select()
        .from(rooms)
        .where(
            and(
                eq(rooms.id, groupId as string),
                or(
                    eq(rooms.access, "USER"),
                    eq(rooms.access, "ADMIN"),
                )
            )
        );

        if (!roomsList) {
            return {
                success: false,
                messageHeader: "Opa...",
                message: "Error ao buscar salas",
            }
        }

        return JSON.parse(JSON.stringify(roomsList));
    } catch (error) {
        console.log(error);
        return {
            success: false,
            messageHeader: "Opa...",
            message: "Error ao buscar salas: " + error,
        }
    }
}