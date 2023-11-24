import express from "express";
import { getTrainerById } from "./getTrainerById";
import { getTrainers } from "./getTrainers";
import { createTrainer } from "./createTrainer";
import { deleteTrainer } from "./deleteTrainer";

export const trainerRouter = express.Router();

getTrainerById(trainerRouter);
getTrainers(trainerRouter);
createTrainer(trainerRouter);
deleteTrainer(trainerRouter);
