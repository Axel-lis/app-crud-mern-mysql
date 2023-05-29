//un modelo es una abstraccion que representa una tabla en la base de datos, sequelize es una clase que entiende models..
import db from "../database/db.js";
//importamos Sequelize
import { DataTypes } from "sequelize";

const TareaModel= db.define('tareas',{
    title:{type: DataTypes.STRING},
    description:{type: DataTypes.STRING},
    dateinicio:{type: DataTypes.DATE},
    datefin:{type: DataTypes.DATE}
    
})
export default TareaModel;