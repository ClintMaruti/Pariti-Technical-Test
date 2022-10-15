import jwt from "jsonwebtoken";
import config from "../../config/default";
import log from "../logger";
import IMaintainer from "../services/types/serverTypes";

const NAMESPACE = "Auth";

const signJWT = (maintainer: IMaintainer, callback: (error: Error | null, token: string | null) => void): void => {
    let timeSinchEpoch = new Date().getTime();
    let expirationTime = timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
    let expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    log.info(NAMESPACE, `Attempting to sign token for ${maintainer.username}`);

    try {
        jwt.sign({ username: maintainer.username }, config.server.token.secret, { issuer: config.server.token.issuer, algorithm: "HS256", expiresIn: expirationTimeInSeconds }, (error, token) => {
            if (error) {
                callback(error, null);
            } else if (token) {
                callback(null, token);
            }
        });
    } catch (error) {
        log.info(NAMESPACE, (error as Error).message, error);
        callback(error as Error, null);
    }
};

export default signJWT;
