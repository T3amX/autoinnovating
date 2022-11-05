const logger = require('./logger')

module.exports = function (req, res, next) {
    logger.Request({
        user: req.user,
        body: req.body,
        ip: req.ip.split(":").pop()
    })
    next()
}