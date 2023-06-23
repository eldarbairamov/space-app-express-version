import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { MomentRepository, NoteRepository, PlanRepository, TaskRepository } from "@src/repository";
import { ApiException } from "@src/exception/api.exception";

type objectType = "taskId" | "noteId" | "planId" | "momentId"

export const commonMiddleware = {

   isRequestEmpty: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      if (!Object.entries(req.body).length) throw new ApiException("Request is empty", 400);

      next();
   }),

   isObjectExists: (params: objectType) => expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const objectId = req.params[params];

      if (!objectId) throw ApiException.BadRequest();
      if (!Types.ObjectId.isValid(objectId)) throw ApiException.InvalidObjectId();

      switch (params) {
         case "taskId":
            const isTaskExist = await TaskRepository.findById(objectId);
            if (!isTaskExist) throw ApiException.NotExistError();
            break
         case "planId":
            const isPlanExist = await PlanRepository.findById(objectId);
            if (!isPlanExist) throw ApiException.NotExistError();
            break
         case "momentId":
            const isMomentExist = await MomentRepository.findById(objectId);
            if (!isMomentExist) throw ApiException.NotExistError();
            break
         case "noteId":
            const isNoteExist = await NoteRepository.findById(objectId);
            if (!isNoteExist) throw ApiException.NotExistError();
            break
      }

      next();
   }),
};