const Router = require('express')
const router = new Router()
const credentialsRouters = require("./credentials.router")
const userDataRouters = require("./userData.router")

router.get("/",
    (req, res) =>
    {
        res.json({status: "ok!"})
    }
)
router.use('/auth', credentialsRouters)
router.use('/user_data', userDataRouters)

module.exports = router