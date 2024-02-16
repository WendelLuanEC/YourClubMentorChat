const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // ajuste o caminho conforme necessário
const Question = require('./Question'); // Importa o modelo Question

const Answer = sequelize.define('Answer', {
    answer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Question,
            key: 'question_id'
        }
    },
    answer_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false, // Desabilita os timestamps automáticos do Sequelize
    tableName: 'answers'
});

module.exports = Answer;
