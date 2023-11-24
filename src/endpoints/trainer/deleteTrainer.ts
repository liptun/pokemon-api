import { Router } from "express";
import z from "zod";
import { prisma } from "../..";

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
export const deleteTrainer = (router: Router) =>
    router.delete("/trainer", async (req, res) => {
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
