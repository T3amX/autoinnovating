const ApiError = require('../error/ApiError')
const {Credentials} = require('../models/models')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {Op} = require("sequelize");

const generateJWT = (payload) => {
    return jwt.sign(payload,
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )
}

class CredentialsController {
    async getAll(req, res, next) {
        if (!req.user.is_admin) {
            return next(ApiError.badRequest("Недостаточно прав"))
        }
        const lines = await Credentials.findAll({order: ['id']})
        res.json({lines})
    }

    async getOne(req, res, next) {
        const {id} = req.params
        if (!req.user.is_admin && req.user.id !== Number(id)) {
            next(ApiError.badRequest('У вас недостаточно прав'))
        }
        const user = await Credentials.findOne({where: {id}})
        if (!user) {
            return next(ApiError.badRequest("Такого пользователя не существует"))
        }
        return res.json({user})
    }

    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest(errors))
            }
            const {email, password, login} = req.body
            const candidate = await Credentials.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Такой пользователь уже существует'))
            }
            const hashedPassword = bcrypt.hashSync(password, 8)
            const user = await Credentials.create({email, password: hashedPassword, login, is_admin: false})
            res.status(201).json({message: "Successfully registered"})
        } catch (e) {
            console.log(e)
            return next(ApiError.internal("Неизвестная ошибка"))
        }
    }

    async login(req, res, next) {
        try {
            const {login, password} = req.body
            const candidate = await Credentials.findOne({where: {
                [Op.or]: [
                    {email: login},
                    {login}
                ]
            }})
            if (!candidate) {
                return next(ApiError.badRequest("Неккоректное имя пользователя или пароль"))
            }
            const isPair = bcrypt.compareSync(password, candidate.password)
            if (!isPair) {
                return next(ApiError.badRequest("Неккоректное имя пользователя или пароль"))
            }
            const token = generateJWT({id: candidate.id, is_admin: candidate.is_admin})
            res.json({token})
        } catch (e) {
            console.log(e)
            return next(ApiError.internal("Неизвестная ошибка, попробуйте снова"))
        }
    }

    async delete(req, res, next) {
        const {id} = req.params
        if (!req.user.is_admin && req.user.id !== Number(id)) {
            return next(ApiError.badRequest("Недостаточно прав"))
        }
        const user = await Credentials.findOne({where: {id}})
        if (!user) {
            return next(ApiError.badRequest("Такого пользователя не существует"))
        }
        const deleted = await Credentials.destroy({where: {id}})
        res.json({deleted})
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            if (Number(id) !== req.user.id && !req.user.is_admin) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            const data = req.body
            if ("is_admin" in data) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            if ("password" in data) {
                const user = await Credentials.findByPk(id)
                if (await bcrypt.compareSync(data.password, user.password)) {
                    return res.status(400).json({message: "Невозможно сменить пароль на текущий"})
                }
                data.password = await bcrypt.hashSync(data.password, 8)
            }
            const updated = await Credentials.update({...data}, {where: {id}})
            if (updated) {
                res.json({message: "Данные успешно обновлены"})
            } else {
                next(ApiError.internal("Неизвестная ошибка"))
            }
        } catch (e) {
            next(ApiError.internal("Неизвестная ошибка"))
        }
    }
}

module.exports = new CredentialsController()