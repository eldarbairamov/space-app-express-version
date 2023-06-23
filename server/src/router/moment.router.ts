import { Router } from "express";
import { authMiddleware, commonMiddleware, fileMiddleware } from "@src/middleware";
import { momentController } from "@src/controller";

export const momentRouter = Router();

// Get all moments
momentRouter.get(
   "/",
   authMiddleware.isAccessExists,
   momentController.getMoments);

// Add moment
momentRouter.post(
   "/add",
   authMiddleware.isAccessExists,
   momentController.addMoment);

// Get one moment
momentRouter.get(
   "/:momentId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("momentId"),
   momentController.getOneMoment,
);

// Update moment
momentRouter.patch(
   "/:momentId",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   commonMiddleware.isObjectExists("momentId"),
   momentController.updateMoment);

// Delete moment
momentRouter.delete(
   "/:momentId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("momentId"),
   momentController.deleteMoment);

// Upload photo
momentRouter.patch(
   "/:momentId/photo_upload",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("momentId"),
   fileMiddleware.imageChecker,
   momentController.uploadPhoto);
