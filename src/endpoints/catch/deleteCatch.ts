import z from "zod";
import { prisma } from "../../";
import { Router } from "express";

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
export const deleteCatch = (router: Router) =>
    router.delete("/catch", async (req, res) => {
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
