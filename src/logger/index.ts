import loger from "pino";
import dayjs from "dayjs";

const log = loger({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
        },
    },
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}`,
});

export default log;
