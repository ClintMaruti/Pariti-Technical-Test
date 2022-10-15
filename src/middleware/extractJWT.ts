import { Request, Response, NextFunction } from "express";
import log from "../logger/index";
import jwt from "jsonwebtoken";
import config from "../../config/default";

const NAMESPACE = "Auth";

export const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    log.info(NAMESPACE, "Validating Token");

    let token = req.headers.authorization?.split(" ")[1];

    if (token) {
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error,
                });
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default extractJWT;
