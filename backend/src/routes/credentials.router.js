const Router = require('express')
const router = new Router()
const {check} = require("express-validator");

const controller = require("../controllers/credentials.controller")
const authMiddleware = require("../middleware/auth.middleware")
const loggingMiddleware = require("../middleware/logging.middleware")
const requestValidator = require("../middleware/validateRequest.middleware")

router.post('/', [
    check('email', 'email не задан').notEmpty(),
    check('email', 'некорректный email').isEmail(),
    check('login', 'login не задан').notEmpty(),
    check(['login', 'email', 'password'])
        .custom(value => !/\s/.test(value))
        .withMessage('No spaces are allowed'),
    check('password', 'Пароль должен содержать минимум 6 символов').isLength({min: 6})
], loggingMiddleware, controller.registration)
router.post('/login', loggingMiddleware, controller.login)
router.post('/toggle_ban/:id', authMiddleware, loggingMiddleware, requestValidator, controller.toggleBan)
router.get('/:id', authMiddleware, loggingMiddleware, requestValidator, controller.getOne)
router.get('/', authMiddleware, loggingMiddleware, controller.getAll)
router.delete('/:id', authMiddleware, loggingMiddleware, requestValidator, controller.delete)
router.put('/:id', authMiddleware, loggingMiddleware, requestValidator, controller.update)

module.exports = router