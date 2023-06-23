import { Router } from "express";
import { authMiddleware, commonMiddleware } from "@src/middleware";
import { taskController } from "@src/controller";

export const taskRouter = Router();

// Get all tasks
taskRouter.get(
   "/",
   authMiddleware.isAccessExists,
   taskController.getAllTasks);

// Add task
taskRouter.post(
   "/add",
   authMiddleware.isAccessExists,
   commonMiddleware.isRequestEmpty,
   taskController.addTask);

// Update task status
taskRouter.patch(
   "/:taskId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("taskId"),
   taskController.updateTaskStatus);

// Delete task
taskRouter.delete(
   "/:taskId",
   authMiddleware.isAccessExists,
   commonMiddleware.isObjectExists("taskId"),
   taskController.deleteTask);
