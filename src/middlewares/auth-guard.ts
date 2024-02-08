import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { VerifyCallback } from "jsonwebtoken";
import db from "../config/db";

const JWT_SECRET = process.env.JWT_SECRET || "";

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token)
    return next({ status: StatusCodes.UNAUTHORIZED, message: "Unauthorized" });

  const jwtCallback: VerifyCallback = async (err, decodedToken) => {
    if (err)
      return next({
        status: StatusCodes.UNAUTHORIZED,
        message: "Invalid access token",
      });

    const user = await db.user.findOne({
      where: { email: (decodedToken as any).email },
    });

    (req as any).user = user;
    next();
  };

  jwt.verify(token.split("Bearer ")[1], JWT_SECRET, jwtCallback);
};

export default authGuard;
