const Router = require('express')
const router = new Router()

const controller = require("../controllers/ideas.controller")
const loggingMiddleware = require("../middleware/logging.middleware")
const authMiddleware = require("../middleware/auth.middleware")
const requestValidator = require("../middleware/validateRequest.middleware")


router.get('/', authMiddleware, loggingMiddleware, controller.getAll)
router.get('/pagination', authMiddleware, loggingMiddleware, controller.pagination)
router.get('/:id', authMiddleware, loggingMiddleware, requestValidator, controller.getOne)
router.get('/participants/:id', authMiddleware, loggingMiddleware, requestValidator, controller.get_participants)
router.post('/', authMiddleware, loggingMiddleware, controller.create)
router.delete('/:id', authMiddleware, loggingMiddleware, requestValidator, controller.delete)
router.put('/:id', authMiddleware, loggingMiddleware, requestValidator, controller.update)

module.exports = router