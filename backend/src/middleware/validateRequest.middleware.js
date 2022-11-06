const ApiError = require('../error/ApiError')

module.exports = function (req, res, next) {
    if (req.params.id > 2147483647 || isNaN(Number(req.params.id))) {
        return next(ApiError.badRequest("Некорректный id"))
    }
    next()
}