import { Router } from "express";
import z from "zod";
import { prisma } from "../../";

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
export const catchPokemon = (router: Router) => router.post("/catch", async (req, res) => {
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
