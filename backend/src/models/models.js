const sequelize = require('../db')
const {DataTypes, HasMany} = require('sequelize')

const Credentials = sequelize.define('credentials', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    is_admin: {type: DataTypes.BOOLEAN},
    is_disabled: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const UserData = sequelize.define('user_data', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, notNull: false},
    sex: {type: DataTypes.CHAR(1), notNull: false},
    birthdate: {type: DataTypes.DATE, notNull: false},
    country: {type: DataTypes.STRING, notNull: false},
    city: {type: DataTypes.STRING, notNull: false},
    citizenship: {type: DataTypes.STRING, notNull: false},
    telegram: {type: DataTypes.STRING, notNull: false},
    github: {type: DataTypes.STRING, notNull: false},
    phone: {type: DataTypes.CHAR(12), notNull: false},
    vk: {type: DataTypes.STRING, notNull: false},
    info: {type: DataTypes.TEXT, notNull: false},
    has_command: {type: DataTypes.BOOLEAN, notNull: false},
    role: {type: DataTypes.STRING, notNull: false},
    has_patient: {type: DataTypes.BOOLEAN, notNull: false},
    patient_info: {type: DataTypes.STRING, notNull: false},
    has_entity: {type: DataTypes.BOOLEAN, notNull: false},
    inn: {type: DataTypes.STRING, notNull: false}
})

const Categories = sequelize.define('categories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true}
})

const Ideas = sequelize.define('ideas', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    is_innovative: {type: DataTypes.BOOLEAN, defaultValue: false},
    is_project: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const ProjectUser = sequelize.define('project_user', {
    idea_id: {type: DataTypes.INTEGER, primaryKey: true},
    credential_id: {type: DataTypes.INTEGER, primaryKey: true},
    accepted: {type: DataTypes.BOOLEAN, defaultValue: false}
})

Credentials.hasOne(UserData, {
    onDelete: "CASCADE",
    foreignKey: "credential_id"
})

Credentials.hasMany(Ideas, {
    onDelete: "CASCADE",
    foreignKey: "credential_id"
})

Categories.hasMany(Ideas, {
    onDelete: "CASCADE",
    foreignKey: "category_id"
})


Credentials.belongsToMany(Ideas, {foreignKey: "credential_id", through: ProjectUser})
Ideas.belongsToMany(Credentials, {foreignKey: "idea_id", through: ProjectUser})

module.exports = {Credentials, UserData, Categories, Ideas, ProjectUser}