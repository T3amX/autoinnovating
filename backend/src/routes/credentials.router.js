const Router = require('express')
const router = new Router()
const {check} = require("express-validator");

const controller = require("../controllers/credentials.controller")
const authMiddleware = require("../middleware/auth.middleware")
const loggingMiddleware = require("../middleware/logging.middleware")

router.post('/', [
    check('email', 'email не задан').notEmpty(),
    check('email', 'некорректный email').isEmail(),
    check('login', 'login не задан').notEmpty(),
    check('password', 'Пароль должен содержать минимум 6 символов').isLength({min: 6})
], loggingMiddleware, controller.registration)
router.post('/login', loggingMiddleware, controller.login)
router.post('/toggle_ban/:id', authMiddleware, loggingMiddleware, controller.toggleBan)
router.get('/:id', authMiddleware, loggingMiddleware, controller.getOne)
router.get('/', authMiddleware, loggingMiddleware, controller.getAll)
router.delete('/:id', authMiddleware, loggingMiddleware, controller.delete)
router.put('/:id', authMiddleware, loggingMiddleware, controller.update)

module.exports = router