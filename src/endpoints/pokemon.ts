import express from "express";
import { prisma } from "../app";

export const pokemonRouter = express.Router();

pokemonRouter.get("/pokemon/:id", async (req, res) => {
    const id = parseInt(req.params.id?.toString());

    if (isNaN(id)) {
        res.status(400);
        res.json({ error: "400 - invalid pokemon no" });
        return;
    }
    try {
        const pokemon = await prisma.pokemon.findFirst({ where: { no: id } });
        if (pokemon === null) {
            res.status(404);
            res.json({ error: "404 - not found" });
            return;
        }
        res.json(pokemon);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
});

pokemonRouter.get("/pokemon", async (req, res) => {
    const limit = req.query.limit?.toString() || "10";

    try {
        const pokemons = await prisma.pokemon.findMany({
            take: parseInt(limit),
        });
        res.json(pokemons);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
});
