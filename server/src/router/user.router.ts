import { Router } from "express";
import { userController } from "@src/controller";
import { authMiddleware, commonMiddleware, fileMiddleware } from "@src/middleware";

export const userRouter = Router();

// Get user info
userRouter.get(
   "/get_user",
   authMiddleware.isAccessExists,
   userController.getUser);

// Update user profile
userRouter.patch(
   "/profile_update",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   userController.updateProfile);

// Change email: request
userRouter.post(
   "/email_change",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   authMiddleware.isEmailUnique,
   userController.changeEmailRequest);

// Change email: accept
userRouter.patch(
   "/email_new",
   commonMiddleware.isRequestEmpty,
   userController.changeEmail);

// Change password: request
userRouter.patch(
   "/password_new",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   userController.changePassword);

// Upload avatar
userRouter.patch(
   "/avatar_upload",
   authMiddleware.isAccessExists,
   fileMiddleware.imageChecker,
   userController.uploadAvatar);

// Send image name and delete avatar
userRouter.patch(
   "/avatar_delete",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   userController.deleteAvatar);