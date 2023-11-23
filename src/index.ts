import express from "express";
import { PrismaClient } from "@prisma/client";
import { getPokemon, getPokemons } from "./endpoints/pokemon";
import { createTrainer, deleteTrainer, getTrainer, getTrainers } from "./endpoints/trainer";
import { catchPokemon, deleteCatch, updateCatch } from "./endpoints/catch";

export const prisma = new PrismaClient();

const app = express();
app.use(express.json());

const port = process.env.PORT ?? 3000;

const baseUrl = "/api/v1";

app.get("/", (_, res) => {
    res.json({ message: "API is available under /api/v1" });
});

app.get(`${baseUrl}/pokemon/:id`, getPokemon);
app.get(`${baseUrl}/pokemon`, getPokemons);

app.get(`${baseUrl}/trainer/:id`, getTrainer);
app.get(`${baseUrl}/trainer`, getTrainers);
app.post(`${baseUrl}/trainer`, createTrainer);
app.delete(`${baseUrl}/trainer`, deleteTrainer);

app.post(`${baseUrl}/catch`, catchPokemon);
app.delete(`${baseUrl}/catch`, deleteCatch);
app.patch(`${baseUrl}/catch`, updateCatch);

app.all("*", (_, res) => {
    res.status(404);
    res.json({ error: "endpoint don't exists" });
});

app.listen(port, () => console.log(`Server is listening on ${port}`));
