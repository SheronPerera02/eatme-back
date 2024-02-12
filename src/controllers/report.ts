import { NextFunction, Request, Response } from "express";
import db from "../config/db";
import { QueryTypes } from "sequelize";
import { StatusCodes } from "http-status-codes";

const getTotalSales = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    startDate,
    endDate,
    interval = "daily",
    page = 1,
    limit = 10,
  } = req.query;

  const dateFormatOptions = {
    daily: "DATE_FORMAT(date, '%Y-%m-%d')",
    weekly: "CONCAT(YEAR(date), '-', WEEK(date))",
    monthly: "DATE_FORMAT(date, '%Y-%m')",
  };

  const dateFormatOption =
    dateFormatOptions[interval as keyof typeof dateFormatOptions];

  const query = `
    SELECT ${dateFormatOption} as date,
            SUM(orderItems.quantity * items.price) AS total_sales
    FROM orders
    INNER JOIN orderItems on orders.id = orderItems.orderId
    INNER JOIN items on items.id = orderItems.itemId
    WHERE date between '${startDate}' and '${endDate}'
    GROUP BY ${dateFormatOption} ORDER BY date ASC LIMIT ${
    (Number(page) - 1) * Number(limit)
  },${limit};
  `;

  const totalSales = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  res.status(StatusCodes.OK).json({
    message: "Total sales aqcuired successfully",
    data: {
      totalSales,
    },
  });
};

export default { getTotalSales };
