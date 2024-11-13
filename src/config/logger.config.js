import winston from "winston"
import "dotenv/config"

const ENV = process.env.ENV

const customLevelOptions = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
    },
    colors: {
        error: "red",
        warn: "orange",
        info: "yellow",
        verbose: "green",
        debug: "blue",
    },
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            filename: "./error.log",
            level: "fatal",
            format: winston.format.simple(),
        }),
    ],
})

const log = (req, res, next) => {
    req.logger = logger
    //req.logger.verbose(`${req.method} na ${req.url} - ${new Date()}`)
    //req.logger.info(`${req.method} na ${req.url} - ${new Date()}`)
    //req.logger.debug(`${req.method} na ${req.url} - ${new Date()}`)
    next()
}

export default log