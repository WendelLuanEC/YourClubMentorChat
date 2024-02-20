import sequelize from '../sequelize.js';
import  DataTypes  from 'sequelize';

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

export default Question;
