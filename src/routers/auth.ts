import express from "express";
import authController from "../controllers/auth";
import validateRequest from "../validators/validate";
import signinSchema from "../validators/signin";
import signupSchema from "../validators/signup";

const router = express.Router();

router.post("/signin", validateRequest(signinSchema), authController.signin);
router.post("/signup", validateRequest(signupSchema), authController.signup);
router.get("/signup/confirmation", authController.signupConfirmation);

export default router;
