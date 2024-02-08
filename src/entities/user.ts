import { DataTypes, Sequelize } from "sequelize";

const user = (sequelize: Sequelize) => {
  return sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export default user;
