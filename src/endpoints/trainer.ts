import express from "express";
import { prisma } from "..";
import z from "zod";

export const trainerRouter = express.Router();

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
trainerRouter.get('/trainer/:id', async (req, res) => {
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

/**
 * @swagger
 * /trainer:
 *   get:
 *     summary: Get a list of Trainers
 *     description: Retrieve a list of Trainers based on the specified limit.
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: The maximum number of Trainers to retrieve (default is 10).
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
 *                 name: "doenutt_"
 *                 name_jp: "ドエヌット"
 *               - id: 2
 *                 name: "LiptuN"
 *                 name_jp: "リプトゥンノ"

 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "400 - Bad Request"
 */
trainerRouter.get('/trainer', async (req, res) => {
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

/**
 * @swagger
 * /trainer:
 *   post:
 *     summary: Create a new Trainer
 *     description: Create a new Trainer with the provided payload.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *               name_jp:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '201':
 *         description: Successful creation
 *         content:
 *           application/json:
 *             example: 
 *               id: 1
 *               name: 'Foo'
 *               name_jp: 'Bar'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "400 - Bad Request"
 */
trainerRouter.post('/trainer', async (req, res) => {
    const payloadSchema = z
        .object({
            name: z.string().min(1),
            name_jp: z.string(),
        })
        .strict();

    try {
        const validatePayload = payloadSchema.parse(req.body);

        const newTrainer = await prisma.trainer.create({ data: { ...validatePayload } });
        res.status(201);
        res.json(newTrainer);
    } catch (e) {
        res.status(400);
        res.json(e);
    }
});

/**
 * @swagger
 * /trainer:
 *   delete:
 *     summary: Delete a Trainer by ID
 *     description: Delete a Trainer based on the provided payload containing the Trainer ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *             required:
 *               - id
 *     responses:
 *       '200':
 *         description: Successful deletion
 *         content:
 *           application/json:
 *             example: {}
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "400 - Bad Request"
 */
trainerRouter.delete('/trainer', async (req, res) => {
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
});
