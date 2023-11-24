import z from "zod";
import { prisma } from "../../";
import { Router } from "express";

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
export const updateCatch = (router: Router) =>
    router.patch("/catch", async (req, res) => {
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
