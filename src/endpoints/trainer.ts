import { RequestHandler } from "express";
import { prisma } from "..";
import z from "zod";

export const getTrainer: RequestHandler = async (req, res) => {
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
};

export const getTrainers: RequestHandler = async (req, res) => {
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
};

export const createTrainer: RequestHandler = async (req, res) => {
    const payloadSchema = z.object({
        name: z.string().min(1),
        name_jp: z.string(),
    }).strict();

    try {
        const validatePayload = payloadSchema.parse(req.body);

        const newTrainer = await prisma.trainer.create({ data: { ...validatePayload } });
        res.status(201);
        res.json(newTrainer);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
};

export const deleteTrainer: RequestHandler = async (req, res) => {
    const payloadSchema = z.object({
        id: z.number(),
    });

    try {
        const validatePayload = payloadSchema.parse(req.body);
        const { id } = validatePayload;

        const deletedTrainer = await prisma.trainer.delete({ where: { id } });
        res.status(200);
        res.json(deletedTrainer);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
};
