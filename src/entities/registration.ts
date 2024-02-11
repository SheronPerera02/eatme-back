import { DataTypes, Model, Sequelize } from "sequelize";

type Registration = Model<{
  token: string;
  expiration: Date;
  email: string;
  password: string;
}>;

const registration = (sequelize: Sequelize) => {
  return sequelize.define<Registration>("registration", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: false,
    },
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

export default registration;
