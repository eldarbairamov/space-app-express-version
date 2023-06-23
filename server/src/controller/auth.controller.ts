import expressAsyncHandler from "express-async-handler";
import { type Response, type Request } from "express";
import { activationService, forgotPasswordService, loginService, refreshService, registrationService, resetPasswordService } from "@src/service";
import { IAccessTokenPair, ILogin, IOAuthResponse, IRequest, IResetPassword } from "@src/interface";
import { OAuthRepository } from "@src/repository";

export const authController = {

   registration: expressAsyncHandler(async (req: Request, res: Response<{ message: string }>) => {
      await registrationService(req.body);
      res.status(201).json({ message: "Success" });
   }),

   login: expressAsyncHandler(async (req: IRequest<ILogin, any, any>, res: Response<IOAuthResponse>) => {
      const accessTokenPair = await loginService(req.body, req.user!);
      res.status(201).json(accessTokenPair);
   }),

   refresh: expressAsyncHandler(async (req: IRequest<{ refreshToken: string }, any, any>, res: Response<IAccessTokenPair>) => {
      const accessTokenPair = await refreshService(req.body.refreshToken);
      res.status(201).json(accessTokenPair);
   }),

   activation: expressAsyncHandler(async (req: IRequest<{ activationCode: string }, any, any>, res: Response<{ message: string }>) => {
      await activationService(req.body.activationCode);
      res.json({ message: "Success" });
   }),

   forgotPassword: expressAsyncHandler(async (req: IRequest<{ email: string }, any, any>, res: Response<{ message: string }>) => {
      const clientUrl = req.headers.origin;
      await forgotPasswordService(req.body.email, req.user!, clientUrl!);
      res.json({ message: "Success" });
   }),

   resetPassword: expressAsyncHandler(async (req: IRequest<IResetPassword, any, any>, res: Response<{ message: string }>) => {
      await resetPasswordService(req.body);
      res.json({ message: "Success" });
   }),

   logout: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response<{ message: string }>) => {
      await OAuthRepository.deleteOne({ accessToken: req.token });
      res.json({ message: "Success" });
   }),

};
