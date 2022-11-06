const Router = require('express')
const router = new Router()

const controller = require("../controllers/userData.controller")
const authMiddleware = require("../middleware/auth.middleware")
const loggingMiddleware = require("../middleware/logging.middleware")
const requestValidator = require("../middleware/validateRequest.middleware")

router.get('/', authMiddleware, loggingMiddleware, controller.getAll)
router.get('/:id', authMiddleware, loggingMiddleware, requestValidator, controller.getOne)
router.put('/:id', authMiddleware, loggingMiddleware, requestValidator, controller.update)


module.exports = router