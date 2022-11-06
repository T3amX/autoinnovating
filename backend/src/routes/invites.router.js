const Router = require('express')
const router = new Router()

const controller = require("../controllers/invites.controller")
const authMiddleware = require("../middleware/auth.middleware")
const loggingMiddleware = require("../middleware/logging.middleware")

router.get('/', authMiddleware, loggingMiddleware, controller.getAll)
router.post('/', authMiddleware, loggingMiddleware, controller.create)
router.delete('/', authMiddleware, loggingMiddleware, controller.delete)
router.put('/', authMiddleware, loggingMiddleware, controller.update)

module.exports = router