const Sequelize = require("sequelize");

const DB_NAME = 'nodejs'
const USER_NAME = 'root'
const PASSWORD = 'root'

const sequeilize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: '0.0.0.0',
    port: 33061,
    dialect: 'mysql'
});


module.exports = sequeilize;