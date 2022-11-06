const ApiError = require('../error/ApiError')
const {Ideas, ProjectUser, Credentials, UserData, Categories} = require('../models/models')



const {handleError, checkStringIsValid} = require("./utils")



class IdeasController {
    async getAll(req, res, next) {
        try {
            const {offset, limit} = req.query
            const lines = await Ideas.findAll({
                order: ['id'],
                limit,
                offset
            })
            res.json({lines})
        } catch (e) {
            handleError(e, next)
        }
    }

    async get_participants(req, res, next) {
        try {
            const {id} = req.params
            const idea = await Ideas.findByPk(id)
            if (!idea) {
                next(ApiError.badRequest("Идеи не существует"))
            }
            const participants = await ProjectUser.findAll({where: {idea_id: id, accepted: true}})
            const lines = []
            for (const participant of participants) {
                const user = await Credentials.findOne({
                    where: {id: participant.credential_id},
                    include: [UserData],
                    attributes: ["login"]
                })
                lines.push({
                    id: user.user_datum.credential_id,
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


    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const idea = await Ideas.findOne({
                where: {id},
            })
            if (!idea) {
                return next(ApiError.badRequest("Такой идеи не существует"))
            }
            return res.json({idea})
        } catch (e) {
            handleError(e, next)
        }
    }

    async create(req, res, next) {
        try {
            const {title, description, categoryId} = req.body
            const candidate = await Ideas.findOne({
                where: { title },
                attributes: ['id']
            })
            if (!checkStringIsValid(title)) {
                next(ApiError.badRequest("Некорректное название"))
            }
            if (candidate) {
                return next(ApiError.badRequest('Такая идея уже существует'))
            }
            const category = await Categories.findByPk(categoryId)
            if (!category) {
                next(ApiError.badRequest("Категории не существует"))
            }
            const idea = await Ideas.create({title, description, category_id: categoryId, credential_id: req.user.id})
            await ProjectUser.create({idea_id: idea.id, credential_id: req.user.id, accepted: true})
            res.status(201).json({message: "Successfully created", id: idea.id})
        } catch (e) {
            handleError(e, next)
        }
    }

    async pagination(req, res) {
        const {limit} = req.body
        const ideas = await Ideas.findAll()
        res.json({pages_count: Math.ceil(ideas.length / limit)})
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const idea = await Ideas.findOne({where: {id}})
            if (!req.user.is_admin && idea.credential_id !== req.user.id) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            if (!idea) {
                return next(ApiError.badRequest("Такой идеи не существует"))
            }
            const deleted = await Ideas.destroy({where: {id}})
            res.json({deleted})
        } catch (e) {
            handleError(e, next)
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const data = req.body
            if (data.title && !checkStringIsValid(data.title)) {
                next(ApiError.badRequest("Некорректное название"))
            }
            const idea = await Ideas.findByPk(id)
            if (!idea) {
                return next(ApiError.badRequest("Такой идеи не существует"))
            }
            if (data.categoryId) {
                const category = await Categories.findByPk(categoryId)
                if (!category) {
                    next(ApiError.badRequest("Категории не существует"))

                }
            }
            if (
                !req.user.is_admin && idea.credential_id !== req.user.id ||
                "is_innovative" in data && !req.user.is_admin ||
                "credential_id" in data
            ) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            const updated = await Ideas.update({...data}, {where: {id}})
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

module.exports = new IdeasController()