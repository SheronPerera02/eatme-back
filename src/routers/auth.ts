import express from "express";
import authController from "../controllers/auth";
import validateRequest from "../validators/validate";
import signinSchema from "../validators/signin";
import signupSchema from "../validators/signup";
import getRefreshTokenSchema from "../validators/get-refresh-token";
import signupConfirmationSchema from "../validators/signup-confirmation";

const router = express.Router();

router.post("/signin", validateRequest(signinSchema), authController.signin);
router.post("/signup", validateRequest(signupSchema), authController.signup);
router.get(
  "/signup/confirmation",
  validateRequest(signupConfirmationSchema),
  authController.signupConfirmation,
);
router.post(
  "/token/refresh",
  validateRequest(getRefreshTokenSchema),
  authController.getRefreshToken,
);

export default router;
