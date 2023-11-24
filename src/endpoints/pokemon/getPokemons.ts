import { Router } from "express";
import { prisma } from "../../"

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
export const getPokemons = (router: Router) => router.get("/pokemon", async (req, res) => {
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
