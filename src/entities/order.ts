import { DataTypes, Model, Sequelize } from "sequelize";
import { OrderStatus } from "../enum";

export type Order = Model<{
  id?: number;
  date: Date;
  status: OrderStatus;
  userId?: number;
}>;

const order = (sequelize: Sequelize) => {
  return sequelize.define<Order>("order", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        OrderStatus.complete,
        OrderStatus.processing,
        OrderStatus.pending,
      ),
      allowNull: false,
    },
  });
};

export default order;
