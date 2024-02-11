import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { decodeToken } from "../util/token";

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token)
    return next({ status: StatusCodes.UNAUTHORIZED, message: "Unauthorized" });

  try {
    const { user } = await decodeToken(token.split("Bearer ")[1]);

    (req as any).user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export default authGuard;
