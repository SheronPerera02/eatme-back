import { Dialect, Sequelize } from "sequelize";
import user from "../entities/user";
import registration from "../entities/registration";

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  dialect: (process.env.DIALECT as Dialect) || "mysql",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});

const db = { user: user(sequelize), registration: registration(sequelize) };

export default { ...db, sequelize };
