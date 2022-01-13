import { Model, DataTypes } from "sequelize";
import config from "../config";
const { sequelize } = config;

class Users extends Model {}
Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { isEmail: true }, // OR is: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/   // `/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/` is email validation regex
    },
  },
  {
    sequelize,
    underscored: true,
  }
);

Users.sync();

export default Users;
