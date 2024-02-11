import { DataTypes, Model, Sequelize } from "sequelize";

export type Order = Model<{
  id?: number;
  date: Date;
  userId?: number;
}>;

const order = (sequelize: Sequelize) => {
  return sequelize.define<Order>("order", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};

export default order;
