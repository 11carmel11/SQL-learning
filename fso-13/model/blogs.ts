import { Model, DataTypes } from "sequelize";
import config from "../config";
const { sequelize } = config;

class Blogs extends Model {}
Blogs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      defaultValue: "unknown",
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
  }
);

Blogs.sync();

export default Blogs;
