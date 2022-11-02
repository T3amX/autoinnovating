const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Credentials = sequelize.define('credentials', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    isAdmin: {type: DataTypes.BOOLEAN}
})

module.exports = {Credentials}