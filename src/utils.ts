import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { Request, RequestHandler } from "express";
import * as crypto from "crypto";
import z from "zod";

export const sha256 = (input: string): string => crypto.createHash("sha256").update(input, "utf-8").digest("hex");

class TokenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BearerTokenError";
    }
}

const userSchema = z.object({ name: z.string(), id: z.number(), iat: z.number(), exp: z.number() });
export type User = z.infer<typeof userSchema>;
export type AuthMiddlewareLocals = {
    user: User;
};

type AuthorizationRequestHandler = RequestHandler<any, any, any, any, AuthMiddlewareLocals>;

export const authMiddleware: AuthorizationRequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        if (authHeader !== undefined && authHeader.startsWith("Bearer ")) {
            const tokenSchema = z.tuple([z.literal("Bearer"), z.string()]);
            const [_, token] = tokenSchema.parse(authHeader.split(" "));
            const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "");
            const validated = userSchema.parse(decoded);
            res.locals.user = validated;
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
