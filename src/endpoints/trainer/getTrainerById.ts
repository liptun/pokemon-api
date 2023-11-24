import { Router } from "express";
import { prisma } from "../../";

/**
 * @swagger
 * /trainer/{id}:
 *   get:
 *     summary: Get a Trainer by ID
 *     description: Retrieve Trainer details and the list of caught Pokemon based on the specified Trainer ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Trainer to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Ash Ketchum
 *               name_jp: Satoshi
 *               pokemons:
 *                 - id: 123
 *                   no: 25
 *                   name: Pikachu
 *                   name_jp: Pikachu
 *                   species: Electric Mouse Pokemon
 *                   description: A cute and powerful Electric-type Pokemon.
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "400 - Bad Request"
 *       '404':
 *         description: Trainer not found
 *         content:
 *           application/json:
 *             example:
 *               error: "404 - Trainer not found"
 */
export const getTrainerById = (router: Router) =>
    router.get("/trainer/:id", async (req, res) => {
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
