const Router = require('express')
const router = new Router()

const controller = require("../controllers/ideas.controller")
const loggingMiddleware = require("../middleware/logging.middleware")
const authMiddleware = require("../middleware/auth.middleware")


router.get('/', authMiddleware, loggingMiddleware, controller.getAll)
router.get('/:id', authMiddleware, loggingMiddleware, controller.getOne)
router.post('/', authMiddleware, loggingMiddleware, controller.create)
router.post('/add_user/:id', authMiddleware, loggingMiddleware, controller.add_user)
router.delete('/:id', authMiddleware, loggingMiddleware, controller.delete)
router.put('/:id', authMiddleware, loggingMiddleware, controller.update)

module.exports = router