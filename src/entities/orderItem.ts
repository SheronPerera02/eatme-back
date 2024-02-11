import { DataTypes, Model, Sequelize } from "sequelize";

export type OrderItem = Model<{
  quantity: number;
  orderId?: number;
  itemId?: number;
}>;

const orderItem = (sequelize: Sequelize) => {
  return sequelize.define<OrderItem>("orderItem", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

export default orderItem;
