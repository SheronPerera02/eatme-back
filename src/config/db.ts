import { Dialect, Sequelize } from "sequelize";
import user from "../entities/user";
import registration from "../entities/registration";
import userAuth from "../entities/user-auth";
import item from "../entities/item";
import order from "../entities/order";
import orderItem from "../entities/orderItem";

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
  item: item(sequelize),
  order: order(sequelize),
  orderItem: orderItem(sequelize),
};

db.user.hasOne(db.userAuth);
db.userAuth.belongsTo(db.user);

db.user.hasMany(db.order);
db.order.belongsTo(db.user);

db.order.belongsToMany(db.item, { through: db.orderItem });
db.item.belongsToMany(db.order, { through: db.orderItem });

export default { ...db, sequelize };
