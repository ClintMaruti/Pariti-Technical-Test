import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;
const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_EXPIRETIME || 3600;
const SERVER_TOKEN_SECRET = process.env.SERVER_SECRET || "PARITI";
const SERVER_TOKEN_ISSUER = process.env.SERVER_ISSUER || "PARITI";

// set up our db config values
const server = {
    port: PORT,
    hostname: SERVER_HOST,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET,
    },
};

const config = {
    server: server,
};

export default config;
