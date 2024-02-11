import { DataTypes, Model, Sequelize } from "sequelize";
import { UserAuth } from "./user-auth";

export type User = Model<{
  id?: number;
  email: string;
  password: string;
  userAuth?: UserAuth;
}>;

const user = (sequelize: Sequelize) => {
  return sequelize.define<User>("user", {
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
