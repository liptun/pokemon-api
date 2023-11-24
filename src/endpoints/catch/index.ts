import express from "express"
import { catchPokemon } from "./catchPokemon";
import { updateCatch } from "./updateCatch";
import { deleteCatch } from "./deleteCatch";

export const catchRouter = express.Router();
catchPokemon(catchRouter);
updateCatch(catchRouter);
deleteCatch(catchRouter);
