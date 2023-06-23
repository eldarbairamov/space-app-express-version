import { NextFunction, Request, Response } from "express";
import { ApiException } from "@src/exception/api.exception";

export const errorMiddleware = (err: ApiException, req: Request, res: Response, next: NextFunction) => {
   res.status(err.status || 500)
      .json({
         statusCode: err.status || 500,
         message: err.message || "Unknown error",
      });
};