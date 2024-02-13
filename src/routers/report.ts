import express from "express";
import reportController from "../controllers/report";
import getTotalSalesSchema from "../validators/get-total-sales";
import validateRequest from "../validators/validate";
import getAverageOrderValueSchema from "../validators/get-average-order-value";

const router = express.Router();

router.get(
  "/total-sales",
  validateRequest(getTotalSalesSchema),
  reportController.getTotalSales,
);

router.get("/top-selling", reportController.getTopSellingMenuItems);

router.get(
  "/average-order-value",
  validateRequest(getAverageOrderValueSchema),
  reportController.getAverageOrderValue,
);

export default router;
