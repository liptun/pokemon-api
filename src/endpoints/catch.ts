import { RequestHandler } from "express";
import z from "zod";
import { prisma } from "..";

export const catchPokemon: RequestHandler = async (req, res) => {
    const payloadSchema = z
        .object({
            trainerId: z.number(),
            pokemonNo: z.number(),
            name: z.string().optional(),
            name_jp: z.string().optional(),
        })
        .strict();

    try {
        const validatePayload = payloadSchema.parse(req.body);

        const newCatch = await prisma.catchedPokemon.create({ data: { ...validatePayload } });
        res.status(201);
        res.json(newCatch);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
};

export const deleteCatch: RequestHandler = async (req, res) => {
    const payloadSchema = z
        .object({
            id: z.number(),
        })
        .strict();

    try {
        const validatePayload = payloadSchema.parse(req.body);
        const { id } = validatePayload;

        const deletedCatch = await prisma.catchedPokemon.delete({ where: { id } });
        res.status(200);
        res.json(deletedCatch);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
};

export const updateCatch: RequestHandler = async (req, res) => {
    const payloadSchema = z
        .object({
            id: z.number(),
            trainerId: z.number().optional(),
            pokemonNo: z.number().optional(),
            name: z.string().optional(),
            name_jp: z.string().optional(),
        })
        .strict();

    try {
        const validatePayload = payloadSchema.parse(req.body);
        const { id } = validatePayload;

        const deletedCatch = await prisma.catchedPokemon.update({ where: { id }, data: {...validatePayload, id: undefined} });
        res.status(200);
        res.json(deletedCatch);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
};
