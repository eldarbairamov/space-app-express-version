import expressAsyncHandler from "express-async-handler";
import { NextFunction, Response } from "express";
import { IMAGE_MAX_SIZE, IMAGE_MIMETYPES } from "@src/constant";
import { IImage, IRequest } from "@src/interface";
import { ApiException } from "@src/exception/api.exception";

export const fileMiddleware = {
   imageChecker: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response, next: NextFunction) => {
      if (!req.files) throw new ApiException("There are no files in request", 400);

      const images = Object.values(req.files);

      for (const image of images) {
         const { size, mimetype } = image as IImage;

         if (size > IMAGE_MAX_SIZE) throw new ApiException("File size must be less than 10 mb", 413);
         if (!IMAGE_MIMETYPES.includes(mimetype)) throw new ApiException("Invalid file type", 422);
      }

      next();

   }),
};