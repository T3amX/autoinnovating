const Router = require('express')
const router = new Router()

const controller = require("../controllers/userData.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.get('/', authMiddleware, controller.getAll)
router.get('/:id', authMiddleware, controller.getOne)
router.put('/:id', authMiddleware, controller.update)


module.exports = router