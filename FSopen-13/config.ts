require("dotenv").config();
import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";

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

const runMigrations = async () => {
  const migrator = new Umzug({
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    migrations: { glob: "migrations/*ts" },
    logger: console,
  });
  await migrator.up();
  console.log("Migrations up to date");
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("database connected");
  } catch (err) {
    console.log("connecting database failed");
    return process.exit(1);
  }

  return null;
};

const config = {
  PORT,
  sequelize,
  secret,
  connectToDatabase,
};

export default config;
