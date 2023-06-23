import expressAsyncHandler from "express-async-handler";
import { NextFunction, Response } from "express";
import { OAuthRepository, UserRepository } from "@src/repository";
import { ACCESS_TOKEN_TYPE } from "@src/constant";
import { jwtVerifyService } from "@src/service";
import { IRequest } from "@src/interface";
import { ApiException } from "@src/exception/api.exception";
import { emailValidator } from "@src/validator";

export const authMiddleware = {

   isUserExists: expressAsyncHandler(async (req: IRequest<{ email: string }, any, any>, res: Response, next: NextFunction) => {
      const validation = emailValidator.validate({ email: req.body.email });
      if (validation.error) throw new ApiException(validation.error.message, 400);

      const user = await UserRepository.findOne({ email: req.body.email });
      if (!user) throw new ApiException("Wrong email or password", 401);

      req.user = user;

      next();
   }),

   isEmailUnique: expressAsyncHandler(async (req: IRequest<{ email: string }, any, any>, res: Response, next: NextFunction) => {
      const user = await UserRepository.findOne({ email: req.body.email });
      if (user) throw new ApiException("This email is already in use", 409);

      next();
   }),

   isAccessExists: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new ApiException("Token invalid or expired", 401);

      const isAccessTokenExists = await OAuthRepository.findOne({ accessToken: token });
      if (!isAccessTokenExists) throw new ApiException("Token invalid or expired", 401);

      req.userId = jwtVerifyService(token, ACCESS_TOKEN_TYPE);
      req.token = token;

      next();
   }),


};
