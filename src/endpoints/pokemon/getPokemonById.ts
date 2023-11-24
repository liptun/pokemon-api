import { Router } from "express";
import { prisma } from "../../";

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
export const getPokemonById = (router: Router) =>
    router.get("/pokemon/:id", async (req, res) => {
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
