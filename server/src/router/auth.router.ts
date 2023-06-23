import { Router } from "express";
import { authMiddleware, commonMiddleware } from "@src/middleware";
import { authController } from "@src/controller";

export const authRouter = Router();

// Registration
authRouter.post(
   "/registration",
   commonMiddleware.isRequestEmpty,
   authMiddleware.isEmailUnique,
   authController.registration);

// Login
authRouter.post(
   "/login",
   commonMiddleware.isRequestEmpty,
   authMiddleware.isUserExists,
   authController.login);

// Account activation
authRouter.post(
   "/activation",
   commonMiddleware.isRequestEmpty,
   authController.activation);

// Forgot password
authRouter.post(
   "/password_forgot",
   commonMiddleware.isRequestEmpty,
   authMiddleware.isUserExists,
   authController.forgotPassword,);

// Refresh
authRouter.post(
   "/refresh",
   authController.refresh);

// Reset password
authRouter.patch(
   "/password_reset",
   commonMiddleware.isRequestEmpty,
   authController.resetPassword);

// Logout
authRouter.get(
   "/logout",
   authMiddleware.isAccessExists,
   authController.logout);
