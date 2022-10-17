import { Request, Response, NextFunction } from "express";
import log from "../logger/index";
import bcryptjs from "bcryptjs";
import { usersStore } from "../vendorMachine/storage";
import signJWT from "../utils/signJWT";
import { v4 as uuidv4 } from "uuid";
import { isEmpty } from "lodash";
const NAMESPACE = "Maintainer";

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    log.info(NAMESPACE, "Token validated, maintainer authenticated");

    return res.status(200).json({
        message: "Authorized",
    });
};

export const register = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    bcryptjs.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(500).json({ message: hashError.message, error: hashError });
        }

        const _maintainer = {
            _id: uuidv4(),
            username,
            password: hash,
        };

        usersStore.push(_maintainer);
        return res.status(201).json({ message: "User Created!", body: _maintainer });
    });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const user = usersStore.find((user) => {
        return user.username === username;
    });

    if (isEmpty(user)) {
        return res.status(401).json({ message: "User not found" });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
        log.info(NAMESPACE, "Password Mismatch!");
        return res.status(401).json({ message: "Password mismatch!" });
    }
    signJWT(user, (_error, token) => {
        if (_error) {
            log.info(NAMESPACE, "Unable to sign token");
            return res.status(500).json({
                message: _error.message,
                error: _error,
            });
        } else if (token) {
            return res.status(200).json({
                message: "Auth successful",
                token: token,
                user,
            });
        }
    });
};

export const getAllMaintainers = (req: Request, res: Response, next: NextFunction) => {
    const user = usersStore.filter((user) => !user.password);
    return res.status(200).json({ user, count: user.length });
};
