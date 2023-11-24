import express from "express";
import { getPokemonById } from "./getPokemonById";
import { getPokemons } from "./getPokemons";

export const pokemonRouter = express.Router();

getPokemonById(pokemonRouter)
getPokemons(pokemonRouter)
