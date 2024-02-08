import express from "express";
import menuController from "../controllers/menu";

const router = express.Router();

router.get("/", menuController.getMenu);

export default router;
