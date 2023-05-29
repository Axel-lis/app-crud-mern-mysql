import db from "../database/db.js";
import { DataTypes } from "sequelize";

const Usuario = db.define('usuarios', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Usuario;
