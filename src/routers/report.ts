import express from "express";
import reportController from "../controllers/report";
import getTotalSalesSchema from "../validators/get-total-sales";
import validateRequest from "../validators/validate";

const router = express.Router();

router.get(
  "/total-sales",
  validateRequest(getTotalSalesSchema),
  reportController.getTotalSales,
);

router.get("/top-selling", reportController.getTopSellingMenuItems);

export default router;
