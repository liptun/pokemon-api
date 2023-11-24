import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Your API",
            version: "1.0.0",
            description: "API documentation using Swagger JSDoc",
        },
    },
    apis: ["./src/endpoints/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

