import express from "express";
import z from "zod";
import { prisma } from "..";

export const catchRouter = express.Router();

/**
 * @swagger
 * /catch:
 *   post:
 *     summary: Record a new Pokemon catch
 *     description: Record a new Pokemon catch with the provided payload.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainerId:
 *                 type: number
 *               pokemonNo:
 *                 type: number
 *               name:
 *                 type: string
 *                 nullable: true
 *               name_jp:
 *                 type: string
 *                 nullable: true
 *             required:
 *               - trainerId
 *               - pokemonNo
 *     responses:
 *       '201':
 *         description: Successful creation
 *         content:
 *           application/json:
 *             example:
 *               id: 9
 *               pokemonNo: 1
 *               trainerid: 1
 *               name: null
 *               name_jp: null
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "400 - Bad Request"
 */
catchRouter.post("/catch", async (req, res) => {
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
});

/**
 * @swagger
 * /catch:
 *   delete:
 *     summary: Delete a recorded Pokemon catch by ID
 *     description: Delete a recorded Pokemon catch based on the provided payload containing the catch ID.
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
 *             example:
 *               id: 9
 *               pokemonNo: 1
 *               trainerid: 1
 *               name: null
 *               name_jp: null
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "400 - Bad Request"
 */
catchRouter.delete("/catch", async (req, res) => {
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
});

/**
 * @swagger
 * /catch:
 *   patch:
 *     summary: Update a recorded Pokemon catch by ID
 *     description: Update a recorded Pokemon catch based on the provided payload containing the catch ID and optional new values.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               trainerId:
 *                 type: number
 *                 nullable: true
 *               pokemonNo:
 *                 type: number
 *                 nullable: true
 *               name:
 *                 type: string
 *                 nullable: true
 *               name_jp:
 *                 type: string
 *                 nullable: true
 *             required:
 *               - id
 *     responses:
 *       '200':
 *         description: Successful update
 *         content:
 *           application/json:
 *             example:
 *               id: 9
 *               pokemonNo: 1
 *               trainerid: 1
 *               name: null
 *               name_jp: null
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "400 - Bad Request"
 */
catchRouter.patch("/catch", async (req, res) => {
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
