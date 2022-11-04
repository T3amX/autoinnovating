const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const {Credentials} = require('../models/models')

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.notAuthorized())
        }

        const accessToken = authorizationHeader.split(" ")[1]
        if (!accessToken) {
            return next(ApiError.notAuthorized())
        }
        const userData = jwt.verify(accessToken, process.env.JWT_SECRET, {}, undefined)
        if (!userData) {
            return next(ApiError.notAuthorized())
        }
        Credentials.findByPk(userData.id).then(user => {
            if (user.is_disabled) {
                return next(ApiError.badRequest("User is disabled"))
            } else {
                req.user = userData
                next()
            }
        })
    } catch (e) {
        return next(ApiError.notAuthorized())
    }
}