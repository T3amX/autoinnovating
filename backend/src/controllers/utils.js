const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
const logger = require("../middleware/logger")

const generateJWT = (payload) => {
    return jwt.sign(payload,
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )
}

const handleError = (error, next) => {
    logger.Error({message: error.message})
    return next(ApiError.internal(error.message))
}

module.exports = {generateJWT, handleError}