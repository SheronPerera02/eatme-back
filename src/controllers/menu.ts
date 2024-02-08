import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const getMenu = async (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).json({
    message: "Menu aqcuired successfully",
    data: {
      menu: [],
    },
  });
};

export default {
  getMenu,
};
