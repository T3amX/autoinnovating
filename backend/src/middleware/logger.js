const logger = require("zeph1rr-logger")(process.env.DEBUG_LEVEL, process.env.LOG_PATH);

class Logger {
    log (data) {
        logger(data)
    }
    Request (data) {
        this.log({
            type: "REQUEST",
            ...data
        })
    }
    Error (data) {
        this.log({
            type: "ERROR",
            ...data
        })
    }
}

module.exports = new Logger()

