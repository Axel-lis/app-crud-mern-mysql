import db from "../database/db.js";
import { DataTypes } from "sequelize";
import TareaModel from "./TareaModel.js";

const Usuario = db.define('usuarios', {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
});

Usuario.associate = (models) => {
  Usuario.hasMany(models.TareaModel, {
    foreignKey: 'userId'
  });
};

export default Usuario;
