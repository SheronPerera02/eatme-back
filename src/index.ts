import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { StatusCodes } from "http-status-codes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: err.message || "Internal server error" });
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`),
);
