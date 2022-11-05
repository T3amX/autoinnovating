const ApiError = require('../error/ApiError')
const {Categories} = require('../models/models')

const {handleError} = require("./utils")



class CategoriesController {
    async getAll(req, res, next) {
        try {
            if (!req.user.is_admin) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            const lines = await Categories.findAll({
                order: ['name']
            })
            res.json({lines})
        } catch (e) {
            handleError(e, next)
        }
    }


    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const category = await Categories.findOne({
                where: {id},
            })
            if (!category) {
                return next(ApiError.badRequest("Такой категории не существует"))
            }
            return res.json({category})
        } catch (e) {
            handleError(e, next)
        }
    }

    async create(req, res, next) {
        try {
            if (!req.user.is_admin) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            const {name} = req.body
            const candidate = await Categories.findOne({
                where: { name },
                attributes: ['id']
            })
            if (candidate) {
                return next(ApiError.badRequest('Такая категория уже существует'))
            }
            await Categories.create({name})

            res.status(201).json({message: "Successfully created"})
        } catch (e) {
            handleError(e, next)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            if (!req.user.is_admin) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            const category = await Categories.findOne({where: {id}})
            if (!category) {
                return next(ApiError.badRequest("Такой категории не существует"))
            }
            const deleted = await Categories.destroy({where: {id}})
            res.json({deleted})
        } catch (e) {
            handleError(e, next)
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            if (!req.user.is_admin) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            const {name} = req.body

            const updated = await Categories.update({name}, {where: {id}})
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

module.exports = new CategoriesController()