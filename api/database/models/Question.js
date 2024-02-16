const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // ajuste o caminho conforme necessário

const Question = sequelize.define('Question', {
    question_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    question_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false, // Desabilita os timestamps automáticos do Sequelize
    tableName: 'questions'
});

module.exports = Question;
