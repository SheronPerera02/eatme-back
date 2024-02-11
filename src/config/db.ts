import { Dialect, Sequelize } from "sequelize";
import user from "../entities/user";
import registration from "../entities/registration";
import userAuth from "../entities/user-auth";

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  dialect: (process.env.DIALECT as Dialect) || "mysql",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: false,
});

const db = {
  user: user(sequelize),
  registration: registration(sequelize),
  userAuth: userAuth(sequelize),
};

db.user.hasOne(db.userAuth);
db.userAuth.belongsTo(db.user);

export default { ...db, sequelize };
