import express from "express";
import z from "zod";
import { prisma } from "../app";
import { authMiddleware } from "../utils";

export const catchRouter = express.Router();

catchRouter.post("/catch", authMiddleware, async (req, res) => {
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
        const { user } = res.locals;

        const newCatch = await prisma.catchedPokemon.create({ data: { ...validatePayload, userId: user.id } });
        res.status(201);
        res.json(newCatch);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
});

catchRouter.delete("/catch/:id", authMiddleware, async (req, res) => {
    const id = parseInt(req.params.id?.toString());

    if (isNaN(id)) {
        res.status(400);
        res.json({ error: "400 - invalid catch id" });
        return;
    }
    try {
        const deletedCatch = await prisma.catchedPokemon.delete({ where: { id } });
        res.status(200);
        res.json(deletedCatch);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
});

catchRouter.patch("/catch", authMiddleware, async (req, res) => {
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

        const deletedCatch = await prisma.catchedPokemon.update({
            where: { id },
            data: { ...validatePayload, id: undefined },
        });
        res.status(200);
        res.json(deletedCatch);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
});
