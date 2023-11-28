import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { RequestHandler } from "express";
import * as crypto from "crypto";
import z from "zod";

export const sha256 = (input: string): string => crypto.createHash("sha256").update(input, "utf-8").digest("hex");

class TokenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BearerTokenError";
    }
}

export type AuthMiddlewareLocals = {
    user: JwtPayload | string;
};

type AuthorizationRequestHandler = RequestHandler<any, any, any, any, AuthMiddlewareLocals>;

export const authMiddleware: AuthorizationRequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        if (authHeader !== undefined && authHeader.startsWith("Bearer ")) {
            const tokenSchema = z.tuple([z.literal("Bearer"), z.string()]);
            const [_, token] = tokenSchema.parse(authHeader.split(" "));
            const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "");
            res.locals.user = decoded;
            next();
        } else {
            throw new TokenError("Bearer token is missing");
        }
    } catch (e) {
        if (e instanceof TokenExpiredError) {
            res.json({
                error: "Unauthorized",
                message: "Token has expired",
                details: e,
            }).status(401);
        } else if (e instanceof JsonWebTokenError) {
            res.json({
                error: "Unauthorized",
                message: "Token is invalid",
                details: e,
            }).status(401);
        } else {
            res.json(e).status(401);
        }
    }
};
