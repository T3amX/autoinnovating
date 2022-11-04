const ApiError = require('../error/ApiError')
const {Credentials} = require('../models/models')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const {Op} = require("sequelize");

const {generateJWT, handleError} = require("./utils")



class CredentialsController {
    async getAll(req, res, next) {
        try {
            if (!req.user.is_admin) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            const lines = await Credentials.findAll({order: ['id']})
            res.json({lines})
        } catch (e) {
            handleError(e, next)
        }
    }


    async getOne(req, res, next) {
        try {
            const {id} = req.params
            if (!req.user.is_admin && req.user.id !== Number(id)) {
                next(ApiError.badRequest('У вас недостаточно прав'))
            }
            const user = await Credentials.findOne({where: {id}})
            if (!user) {
                return next(ApiError.badRequest("Такого пользователя не существует"))
            }
            return res.json({user})
        } catch (e) {
            handleError(e, next)
        }
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
            handleError(e, next)
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
            if (candidate.is_disabled) {
                return next(ApiError.badRequest("User disabled"))
            }
            const isPair = bcrypt.compareSync(password, candidate.password)
            if (!isPair) {
                return next(ApiError.badRequest("Неккоректное имя пользователя или пароль"))
            }
            const token = generateJWT({id: candidate.id, is_admin: candidate.is_admin})
            res.json({token})
        } catch (e) {
            handleError(e, next)
        }
    }

    async delete(req, res, next) {
        try {
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
        } catch (e) {
            handleError(e, next)
        }
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
            handleError(e, next)
        }
    }

    async toggleBan(req, res, next) {
        try {
            const {id} = req.params
            if (!req.user.is_admin) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            const candidate = await Credentials.findByPk(id)
            if (!candidate) {
                return next(ApiError.badRequest("Такого пользователя не существует"))
            }
            candidate.is_disabled = !candidate.is_disabled
            await candidate.save()
            return res.json({message: "ok"})
        } catch (e) {
            handleError(e, next)
        }
    }
}

module.exports = new CredentialsController()