const ApiError = require('../error/ApiError')
const {UserData, Credentials} = require('../models/models')
const {Op} = require("sequelize");

const {handleError, checkStringIsValid} = require("./utils")

class UserDataController {
    async getAll(req, res, next) {
        try {
            if (!req.user.is_admin) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            const lines = await UserData.findAll({
                order: ['id']
            })
            res.json({lines})
        } catch (e) {
            handleError(e, next)
        }
    }


    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const user = await UserData.findOne({where: {id}})
            if (!user) {
                return next(ApiError.badRequest("Такого пользователя не существует"))
            }
            return res.json({user})
        } catch (e) {
            handleError(e, next)
        }
    }

    async search(req, res, next) {
        try {
            const users = await Credentials.findAll({
                attributes: ["id", "login"],
                order: ["id"],
                include: [
                    {
                        model: UserData,
                        attributes: ["role", "info"]
                    }
                ]
            })
            let lines = []
            for (const user of users) {
                lines.push({
                    id: user.id,
                    nickname: user.login,
                    role: user.user_datum.role,
                    info: user.user_datum.info
                })
            }
            res.json({lines})
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
            const candidate = await UserData.findByPk(id)
            const fields = Object.keys(data)
            fields.forEach(field => {
                if (typeof data[field] === "string") {
                    if (!checkStringIsValid(data[field])) {
                        next(ApiError.badRequest("Некорректная длинна поля " + field))
                    }
                }
            })
            if (!candidate) {
                next(ApiError.badRequest("Пользователя не существует"))
            }
            const updated = await UserData.update({...data}, {where: {id}})
            if (updated) {
                res.json({message: "Данные успешно обновлены"})
            } else {
                next(ApiError.internal("Неизвестная ошибка"))
            }
        } catch (e) {
            handleError(e, next)
        }
    }
}

module.exports = new UserDataController()