import { DataTypes } from "sequelize";
const up = async ({
  context: queryInterface,
}: {
  context: {
    createTable: (a1: string, a2: unknown) => Promise<void>;
    addColumn: (a1: string, a2: string, a3: unknown) => Promise<void>;
  };
}) => {
  await queryInterface.createTable("blogs", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  await queryInterface.createTable("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  });
  await queryInterface.addColumn("blogs", "user_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
  });
};

const down = async (queryInterface: {
  dropTable: (a1: string) => Promise<void>;
}) => {
  await queryInterface.dropTable("blogs");
  await queryInterface.dropTable("users");
};

export default { up, down };
