const Router = require('express')
const router = new Router()

const controller = require("../controllers/categories.controller")
const authMiddleware = require("../middleware/auth.middleware")
const loggingMiddleware = require("../middleware/logging.middleware")
const requestValidator = require("../middleware/validateRequest.middleware")

router.get('/', authMiddleware, loggingMiddleware, controller.getAll)
router.get('/:id', authMiddleware, loggingMiddleware, requestValidator, controller.getOne)
router.post('/', authMiddleware, loggingMiddleware, controller.create)
router.delete('/:id', authMiddleware, loggingMiddleware, requestValidator, controller.delete)
router.put('/:id', authMiddleware, loggingMiddleware, requestValidator, controller.update)

module.exports = router