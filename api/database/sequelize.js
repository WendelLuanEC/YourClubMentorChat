import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // ou outro dialeto conforme seu banco de dados
  dialectOptions: {
    connectTimeout: 60000 // Ajuste o valor conforme necessário, em milissegundos
  }
});

export default sequelize;
