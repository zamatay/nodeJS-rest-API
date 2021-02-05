const Sequaelize = require("sequelize");
const db = require("../utils/db");

const todo = db.define('Todo', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequaelize.INTEGER
    },
    done: {
        type: Sequaelize.BOOLEAN,
        allowNull: false
    },
    title: {
        type: Sequaelize.STRING,
        allowNull: false
    }
})

module.exports = todo;