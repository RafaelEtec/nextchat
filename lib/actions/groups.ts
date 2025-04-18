"use server";

import { groups } from "@/database/schema";
import { db } from "@/database/drizzle";
import { and, eq, is, or } from "drizzle-orm";

export const createGroup = async (params: CreateGroupParams) => {
    const {name, description, thumbnail, creatorId} = params;

    try {
        if (!name || !description || !thumbnail) {
            return { success: false, messageHeader: "Opa...", message: "Preencha todos os campos obrigatórios.", }
        }

        const create = await db
        .insert(groups)
        .values({
            name: name as string,
            description: description as string,
            thumbnail: thumbnail as string,
            creatorId: creatorId as string,
        })
        .returning({id: groups.id});

        if (!create) {
            return { success: false, messageHeader: "Opa...", message: "Error ao criar grupo", }
        }

        console.log(create[0].id);

        return {
            id: create[0].id,
            succes: true,
            messageHeader: "Boa!",
            message: "Grupo criado com sucesso",
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            messageHeader: "Opa...",
            message: "Error ao criar grupo: \n" + error,
        }
    }
}

export const findGroupsByUserId = async (id: string) => {
    try {
        const groupsList = await db
        .select({
            id: groups.id,
            name: groups.name,
            description: groups.description,
            thumbnail: groups.thumbnail,
            createdAt: groups.createdAt,
            updatedAt: groups.updatedAt,
            creatorId: groups.creatorId,
        })
        .from(groups)
        .where(
            eq(groups.creatorId, id as string),
        )

        if (groupsList.length === 0) {
            return null;
        }

        return JSON.parse(JSON.stringify(groupsList));
    } catch (error) {
        console.log(error);
        return {
            success: false,
            messageHeader: "Opa...",
            message: "Error ao encontrar grupos: \n" + error,
        }
    }
}