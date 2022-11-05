const ApiError = require('../error/ApiError')
const logger = require('./logger')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        logger.Error({
            status: err.status,
            message: err.message
        })
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: err.message})
}
