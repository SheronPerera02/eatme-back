import jwt, { VerifyCallback } from "jsonwebtoken";
import { User } from "../entities/user";
import db from "../config/db";
import { hoursToMillis } from ".";
import { StatusCodes } from "http-status-codes";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const generateTokens = async (user: User) => {
  const email = user.getDataValue("email");
  const accessToken = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: "1d",
  });
  const newAuthData = {
    refreshToken: refreshToken,
    expiration: new Date(new Date().getTime() + hoursToMillis(24)),
  };

  let userAuth = user.getDataValue("userAuth");

  if (userAuth) {
    await userAuth.update(newAuthData);
  } else {
    userAuth = await db.userAuth.create({
      ...newAuthData,
      userId: user.getDataValue("id"),
    });
  }
  if (!userAuth) {
    throw new Error();
  }
  return { accessToken, refreshToken };
};

export const decodeToken = (token: string) => {
  return new Promise<{ user: User }>((resolve, reject) => {
    const jwtCallback: VerifyCallback = async (err, decodedToken) => {
      if (err)
        return reject({
          status: StatusCodes.UNAUTHORIZED,
          message: "Invalid access token",
        });

      const user = await db.user.findOne({
        where: { email: (decodedToken as any).email },
        include: [db.userAuth],
      });

      if (!user)
        return reject({
          status: StatusCodes.NOT_FOUND,
          message: "User not found",
        });

      resolve({ user });
    };

    jwt.verify(token, JWT_SECRET, jwtCallback);
  });
};
