import db from "../database/db.js";
import { DataTypes } from "sequelize";

const TareaModel = db.define('tareas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(100)
  },
  description: {
    type: DataTypes.STRING(255)
  },
  dateinicio: {
    type: DataTypes.DATE
  },
  datefin: {
    type: DataTypes.DATE
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default TareaModel;
