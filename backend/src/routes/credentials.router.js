const Router = require('express')
const router = new Router()
const {check} = require("express-validator");

const controller = require("../controllers/credentials.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.post('/', [
    check('email', 'email не задан').notEmpty(),
    check('email', 'некорректный email').isEmail(),
    check('login', 'login не задан').notEmpty(),
    check('password', 'Пароль должен содержать минимум 6 символов').isLength({min: 6})
], controller.registration)
router.post('/login', controller.login)
router.get('/:id', authMiddleware, controller.getOne)
router.get('/', authMiddleware, controller.getAll)
router.delete('/:id', authMiddleware, controller.delete)
router.put('/:id', authMiddleware, controller.update)

module.exports = router