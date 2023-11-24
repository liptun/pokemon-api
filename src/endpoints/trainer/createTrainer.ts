import { Router } from "express";
import z from "zod";
import { prisma } from "../..";

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
export const createTrainer = (router: Router) => router.post('/trainer', async (req, res) => {
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
