import express from "express";
import authController from "../controllers/auth";

const router = express.Router();

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.get("/signup/confirmation", authController.signupConfirmation);

export default router;
