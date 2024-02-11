import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import authRouter from "./routers/auth";
import menuRouter from "./routers/menu";
import db from "./config/db";
import authGuard from "./middlewares/auth-guard";
import { seedsOrders } from "./util/seed";

const app = express();
const PORT = process.env.PORT;
const API_BASE = process.env.API_BASE;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/menu", authGuard, menuRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: err.message || "Internal server error" });
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
    return db.sequelize.sync({ force: true });
  })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, async () => {
      console.log(`API accessible on ${API_BASE}`);
      await db.user.create({
        email: "enosh.sheron@gmail.com",
        password: "123456",
      });
      seedsOrders();
    });
  })
  .catch((err) => console.log(err));
