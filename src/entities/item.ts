import { DataTypes, Model, Sequelize } from "sequelize";

export type Item = Model<{
  id?: number;
  name: string;
  price: number;
}>;

const item = (sequelize: Sequelize) => {
  return sequelize.define<Item>("item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });
};

export default item;
