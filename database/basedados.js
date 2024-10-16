const Sequelize = require('sequelize');
const conexao = new Sequelize('guiablog351','root','',{
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
})

module.exports = conexao;