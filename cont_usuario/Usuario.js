const Sequelize = require("sequelize");
const conexao = require("../database/basedados");
const Usuario = conexao.define('usuario', {
    id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Usuario.sync();
module.exports = Usuario