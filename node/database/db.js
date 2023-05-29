import dotenv from 'dotenv';
import {Sequelize} from 'sequelize';

// Cargar las variables de entorno de .env
dotenv.config({path: './.env'});

// Crear una nueva instancia de Sequelize utilizando las variables de entorno
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

export default db;
