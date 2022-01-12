require("dotenv").config();
import { Sequelize } from "sequelize";

const PORT: number = Number(process.env.PORT) || 3001;

const URL: string = process.env.DATABASE_URL || "";

const sequelize = new Sequelize(URL, {
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const secret = process.env.SECRET || "";

const config = {
  PORT,
  sequelize,
  secret,
};

export default config;
