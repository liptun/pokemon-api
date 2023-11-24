import express from "express";
import { PrismaClient } from "@prisma/client";
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from "./swagger";
import { trainerRouter } from "./endpoints/trainer";
import { pokemonRouter } from "./endpoints/pokemon";
import { catchRouter } from "./endpoints/catch";


const port = process.env.PORT ?? 3000;

export const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(pokemonRouter);
app.use(trainerRouter);
app.use(catchRouter);

app.all("*", (_, res) => {
    res.status(404);
    res.json({ error: "endpoint don't exists" });
});

app.listen(port, () => console.log(`Server is listening on ${port}`));
