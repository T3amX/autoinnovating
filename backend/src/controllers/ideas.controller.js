const ApiError = require('../error/ApiError')
const {Ideas, ProjectUser, Credentials, UserData} = require('../models/models')



const {handleError} = require("./utils")



class IdeasController {
    async getAll(req, res, next) {
        try {
            const lines = await Ideas.findAll({
                order: ['id'],
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
            if (candidate) {
                return next(ApiError.badRequest('Такая идея уже существует'))
            }
            await Ideas.create({title, description, categoryId, credentialId: req.user.id})

            res.status(201).json({message: "Successfully created"})
        } catch (e) {
            handleError(e, next)
        }
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
            const idea = await Ideas.findOne({where: {id}})
            if (
                !req.user.is_admin && idea.credentialId !== req.user.id ||
                "is_innovative" in data && !req.user.is_admin ||
                "credentialId" in data
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

    async add_user(req, res, next) {
        try {
            const {id} = req.params
            const {userId} = req.body
            const idea = await Ideas.findByPk(id)
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