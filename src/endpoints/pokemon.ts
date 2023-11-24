import express from "express";
import { prisma } from "..";

export const pokemonRouter = express.Router();

/**
 * @swagger
 * /pokemon/{id}:
 *   get:
 *     summary: Get a Pokemon by ID
 *     description: Retrieve Pokemon details based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Pokemon to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Pikachu
 *               type: Electric
 *       '400':
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             example:
 *               error: "400 - invalid Pokemon ID"
 *       '404':
 *         description: Pokemon not found
 *         content:
 *           application/json:
 *             example:
 *               error: "404 - Pokemon not found"
 */
pokemonRouter.get("/pokemon/:id", async (req, res) => {
    const id = parseInt(req.params.id?.toString());

    if (isNaN(id)) {
        res.status(400);
        res.json({ error: "400 - invalid trainer id" });
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

/**
 * @swagger
 * /pokemon:
 *   get:
 *     summary: Get a list of Pokemon
 *     description: Retrieve a list of Pokemon based on the specified limit.
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: The maximum number of Pokemon to retrieve (default is 10).
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: Pikachu
 *                 type: Electric
 *               - id: 2
 *                 name: Bulbasaur
 *                 type: Grass/Poison
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "400 - Bad Request"
 */
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
