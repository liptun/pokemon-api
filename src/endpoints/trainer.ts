import express from "express";
import { prisma } from "../app";
import z from "zod";
import { authMiddleware } from "../utils";

export const trainerRouter = express.Router();

trainerRouter.get("/trainer/:id", async (req, res) => {
    const id = parseInt(req.params.id?.toString());

    if (isNaN(id)) {
        res.status(400);
        res.json({ error: "400 - invalid trainer id" });
        return;
    }
    try {
        const trainer = await prisma.trainer.findFirst({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                name_jp: true,
            },
        });

        if (trainer === null) {
            res.status(404);
            res.json({ error: "404 - not found" });
            return;
        }

        const pokemons = await prisma.catchedPokemon.findMany({
            where: { trainerId: trainer.id },
            include: { pokemon: true },
        });

        const formattedPokemons = pokemons.map(({ id, name, name_jp, pokemon }) => ({
            id,
            no: pokemon.no,
            name: name ?? pokemon.name,
            name_jp: name_jp ?? pokemon.name_jp,
            species: pokemon.species,
            description: pokemon.description,
        }));

        res.json({ ...trainer, pokemons: formattedPokemons });
    } catch (e) {
        res.status(400);
        res.json(e);
    }
});

trainerRouter.get("/trainer", async (req, res) => {
    const limit = req.query.limit?.toString() || "10";

    try {
        const trainers = await prisma.trainer.findMany({
            select: {
                id: true,
                name: true,
                name_jp: true,
            },
            take: parseInt(limit),
        });

        res.json(trainers);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
});

trainerRouter.post("/trainer", authMiddleware, async (req, res) => {
    const payloadSchema = z
        .object({
            name: z.string().min(1),
            name_jp: z.string().optional(),
        })
        .strict();

    try {
        const validatePayload = payloadSchema.parse(req.body);
        const { user } = res.locals;

        const newTrainer = await prisma.trainer.create({ data: { ...validatePayload, userId: user.id } });
        res.status(201);
        res.json(newTrainer);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
});

trainerRouter.delete("/trainer/:id", authMiddleware, async (req, res) => {
    const idSchema = z.number();

    try {
        const id = idSchema.parse(parseInt(req.params.id));
        const deletedTrainer = await prisma.trainer.delete({ where: { id } });
        res.status(200);
        res.json(deletedTrainer);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
});
