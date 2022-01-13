import { Model, DataTypes } from "sequelize";
import config from "../config";
const { sequelize } = config;

class ToRead extends Model {}
ToRead.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blogId: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: { model: "Blogs", key: "id" },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
  }
);

ToRead.sync();

export default ToRead;
