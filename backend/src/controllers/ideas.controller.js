const ApiError = require('../error/ApiError')
const {Ideas, ProjectUser, Credentials, UserData, Categories} = require('../models/models')



const {handleError, checkStringIsValid} = require("./utils")



class IdeasController {
    async getAll(req, res, next) {
        try {
            const {offset, limit} = req.body
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
            const participants = await ProjectUser.findAll({where: {ideaId: id}})
            const lines = []
            for (const participant of participants) {
                const user = await Credentials.findOne({
                    where: {id: participant.credentialId},
                    include: [UserData],
                    attributes: ["login"]
                })
                lines.push({
                    id: user.user_datum.credentialId,
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
            const idea = await Ideas.create({title, description, categoryId, credentialId: req.user.id})
            await ProjectUser.create({ideaId: idea.id, credentialId: req.user.id})
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
            if (!req.user.is_admin && idea.credentialId !== req.user.id) {
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
            const category = await Categories.findByPk(categoryId)
            if (!category) {
                next(ApiError.badRequest("Категории не существует"))
            }
            if (
                !req.user.is_admin && idea.credentialId !== req.user.id ||
                "is_innovative" in data && !req.user.is_admin ||
                "credentialId" in data
            ) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            const candidate = await Ideas.findByPk(id)
            if (!candidate) {
                next(ApiError.badRequest("Идеи/проекта не существует"))
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

    async add_user(req, res, next) {
        try {
            const {id} = req.params
            const {userId} = req.body
            const idea = await Ideas.findByPk(id)
            if (!idea) {
                next(ApiError.badRequest("Идеи не существует"))
            }
            const user = await Credentials.findByPk(userId)
            if (!user || userId > 2147483647) {
                next(ApiError.badRequest("Пользователя не существует"))
            }
            const candidate = await ProjectUser.findOne(
                {where: {
                    credentialId: userId,
                    ideaId: id
                }})
            if (candidate) {
                next(ApiError.badRequest("Пользователь уже в команде"))
            }
            await ProjectUser.create({ideaId: id, credentialId: userId})
            if (!idea.is_project) {
                idea.is_project = true
                await idea.save()
            }
            res.json({message: "successfully added"})
        } catch (e) {
            handleError(e, next)
        }
    }
}

module.exports = new IdeasController()