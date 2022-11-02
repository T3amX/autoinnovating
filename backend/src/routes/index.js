const Router = require('express')
const router = new Router()
const credentialsRouters = require("./credentials.router")

router.get("/",
    (req, res) =>
    {
        res.json({status: "ok!"})
    }
)
router.use('/auth', credentialsRouters)

module.exports = router