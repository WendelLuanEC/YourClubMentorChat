import sequelize from '../sequelize.js';
import  DataTypes  from 'sequelize';
import Question from './Question.js'; // Importa o modelo Question

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

export default Answer;
