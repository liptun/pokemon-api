import fs from "fs";
import path from "path";

import express, { ErrorRequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";

import { trainerRouter } from "./endpoints/trainer";
import { pokemonRouter } from "./endpoints/pokemon";
import { catchRouter } from "./endpoints/catch";
import { parse } from "yaml";

const file = fs.readFileSync(path.join(__dirname, "swagger.yaml"), "utf8");

const swaggerSpec = parse(file);

const port = process.env.PORT ?? 3000;

export const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const badJsonHandler: ErrorRequestHandler = (err, _req, res, next) => {
    if (err instanceof SyntaxError) {
        res.status(400)
        res.json({ error: err.name, message: err.message });
        return;
    }
    next();
};
app.use(badJsonHandler);

app.use(pokemonRouter);
app.use(trainerRouter);
app.use(catchRouter);

app.all("*", (_, res) => {
    res.status(404);
    res.json({ error: "endpoint don't exists" });
});

app.listen(port, () => console.log(`Server is listening on ${port}`));
