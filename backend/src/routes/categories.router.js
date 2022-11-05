const Router = require('express')
const router = new Router()

const controller = require("../controllers/categories.controller")
const authMiddleware = require("../middleware/auth.middleware")
const loggingMiddleware = require("../middleware/logging.middleware")

router.get('/', authMiddleware, loggingMiddleware, controller.getAll)
router.get('/:id', authMiddleware, loggingMiddleware, controller.getOne)
router.post('/', authMiddleware, loggingMiddleware, controller.create)
router.delete('/:id', authMiddleware, loggingMiddleware, controller.delete)
router.put('/:id', authMiddleware, loggingMiddleware, controller.update)

module.exports = router