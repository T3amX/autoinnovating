require("dotenv").config()
const express = require('express')
const cors = require('cors')

const appInfo = require("./package.json")
const errorHandler = require("./middleware/errorHandling.middleware")
const router = require('./routes')
const sequelize = require('./db')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1/", router)

app.use(errorHandler)



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        app.listen(PORT, () => { console.log(`${appInfo.name}:${appInfo.version} started on port ${PORT}`)})
    } catch (e) {
        console.log(`ERROR: ${e}`)
    }
}


start().then()


