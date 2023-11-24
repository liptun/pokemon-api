import { Router } from "express";
import { prisma } from "../../";

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
export const getTrainers = (router: Router) =>
    router.get("/trainer", async (req, res) => {
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
