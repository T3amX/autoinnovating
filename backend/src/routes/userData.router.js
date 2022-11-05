const Router = require('express')
const router = new Router()

const controller = require("../controllers/userData.controller")
const authMiddleware = require("../middleware/auth.middleware")
const loggingMiddleware = require("../middleware/logging.middleware")

router.get('/', authMiddleware, loggingMiddleware, controller.getAll)
router.get('/:id', authMiddleware, loggingMiddleware, controller.getOne)
router.put('/:id', authMiddleware, loggingMiddleware, controller.update)


module.exports = router