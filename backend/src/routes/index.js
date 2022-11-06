const Router = require('express')
const router = new Router()
const credentialsRouter = require("./credentials.router")
const userDataRouter = require("./userData.router")
const categoriesRouter = require("./categories.router")
const ideasRouter = require("./ideas.router")
const invitesRouter = require("./invites.router")

router.get("/",
    (req, res) =>
    {
        res.json({status: "ok!"})
    }
)
router.use('/auth', credentialsRouter)
router.use('/user_data', userDataRouter)
router.use('/categories', categoriesRouter)
router.use('/ideas', ideasRouter)
router.use('/invites', invitesRouter)

module.exports = router