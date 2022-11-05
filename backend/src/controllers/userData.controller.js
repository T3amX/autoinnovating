const ApiError = require('../error/ApiError')
const {UserData} = require('../models/models')
const {Op} = require("sequelize");

const {handleError} = require("./utils")

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

    async update(req, res, next) {
        try {
            const {id} = req.params
            if (Number(id) !== req.user.id && !req.user.is_admin) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            const data = req.body
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