const ApiError = require('../error/ApiError')
const {ProjectUser, Ideas, Credentials} = require('../models/models')

const {handleError} = require("./utils")



class InvitesController {
    async getAll(req, res, next) {
        try {
            const lines = await ProjectUser.findAll({
                order: ['credential_id'],
                where: {credential_id: req.user.id, accepted: false}
            })
            res.json({lines})
        } catch (e) {
            handleError(e, next)
        }
    }

    async create(req, res, next) {
        try {
            const {user_id, idea_id} = req.body
            const idea = await Ideas.findByPk(idea_id)
            if (!idea) {
                next(ApiError.badRequest("Идеи не существует"))
            }
            const user = await Credentials.findByPk(user_id)
            if (!user || user_id > 2147483647) {
                next(ApiError.badRequest("Пользователя не существует"))
            }
            const candidate = await ProjectUser.findOne(
                {where: {
                        credential_id: user_id,
                        idea_id
                    }})
            if (candidate) {
                next(ApiError.badRequest("Пользователь уже получил приглашение"))
            }
            await ProjectUser.create({idea_id, credential_id: user_id})
            if (!idea.is_project) {
                idea.is_project = true
                await idea.save()
            }
            res.json({message: "successfully added"})
        } catch (e) {
            handleError(e, next)
        }
    }

    async delete(req, res, next) {
        try {
            const {idea_id, credential_id} = req.body
            const idea = await Ideas.findByPk(idea_id)
            if (req.user.id !== credential_id && idea.credential_id !== req.user.id) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            const invite = await ProjectUser.findOne({where: {credential_id: req.user.id, idea_id}})
            if (!invite) {
                return next(ApiError.badRequest("Такого приглашения не существует"))
            }
            const deleted = await ProjectUser.destroy({where: {credential_id: req.user.id, idea_id}})
            res.json({deleted})
        } catch (e) {
            handleError(e, next)
        }
    }

    async update(req, res, next) {
        try {
            const {idea_id} = req.body
            const idea = await Ideas.findByPk(idea_id)
            const invite = await ProjectUser.findOne({where: {idea_id, credential_id: req.user.id, accepted: false}})
            if (!invite) {
                return next(ApiError.badRequest("Приглашение не существует"))
            }
            if (!idea) {
                return next(ApiError.badRequest("Идеи не существует"))
            }
            invite.accepted = true
            invite.save()
            res.json({message: "Данные успешно обновлены"})
        } catch (e) {
            handleError(e, next)
        }
    }
}

module.exports = new InvitesController()