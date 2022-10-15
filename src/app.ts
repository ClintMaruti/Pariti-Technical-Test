import express from "express";
import dotenv from "dotenv";
import log from "./logger";
import routes from "./routes/routes";

dotenv.config();

const PORT = process.env.PORT ?? 8000;

const app = express();

// middleware to parse json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app.listen(PORT, () => {
    log.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    routes(app);
});
