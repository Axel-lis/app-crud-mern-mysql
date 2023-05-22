import { Sequelize } from 'sequelize';


const db = new Sequelize('db_tareas', 'root','',{
    host:'localhost',
    dialect: 'mysql'
});
export default db;