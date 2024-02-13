import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { QueryTypes } from "sequelize";
import db from "../config/db";
import { User } from "../entities/user";

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = (req as any).user;

  const query = `
    SELECT id, date, status
    FROM orders
    WHERE userId='${user.getDataValue("id")}';
  `;

  const orders = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  res.status(StatusCodes.OK).json({
    message: "Orders aqcuired successfully",
    data: {
      orders,
    },
  });
};

export default {
  getOrders,
};
