import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Pokemon API",
            version: "1.0.0",
            description: "Pokemons REST API",
        },
    },
    apis: ["./src/endpoints/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

