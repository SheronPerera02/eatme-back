import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export type UserAuth = Model<{
  id?: number;
  refreshToken: string;
  expiration: Date;
  userId?: number;
  user?: User;
}>;

const userAuth = (sequelize: Sequelize) => {
  return sequelize.define<UserAuth>("userAuth", {
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};

export default userAuth;
