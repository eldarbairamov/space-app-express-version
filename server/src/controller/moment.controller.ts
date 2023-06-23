import expressAsyncHandler from "express-async-handler";
import { Response } from "express";
import { addMomentService, deleteMomentService, getMomentsService, getOneMomentService, updateMomentService, uploadPhotoService } from "@src/service";
import { IQuery } from "@src/interface/common.interface";
import { IMomentResponse, IMomentsResponse, IRequest, IUpdateMoment } from "@src/interface";

export const momentController = {

   addMoment: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response<IMomentResponse>) => {
      const moment = await addMomentService(req.userId);
      res.status(201).json(moment);
   }),

   getMoments: expressAsyncHandler(async (req: IRequest<any, any, IQuery>, res: Response<IMomentsResponse>) => {
      const moments = await getMomentsService(req.userId, req.query.searchKey, req.query.limit);
      res.json(moments);
   }),

   getOneMoment: expressAsyncHandler(async (req: IRequest<any, { momentId: string }, any>, res: Response<IMomentResponse>) => {
      const moment = await getOneMomentService(req.params.momentId);
      res.json(moment);
   }),

   updateMoment: expressAsyncHandler(async (req: IRequest<IUpdateMoment, { momentId: string }, any>, res: Response<{ message: string }>) => {
      await updateMomentService(req.params.momentId, req.body);
      res.json({ message: "Success" });
   }),

   deleteMoment: expressAsyncHandler(async (req: IRequest<any, { momentId: string }, any>, res: Response<{ message: string }>) => {
      await deleteMomentService(req.userId, req.params.momentId);
      res.json({ message: "Success" });
   }),

   uploadPhoto: expressAsyncHandler(async (req: IRequest<any, { momentId: string }, any>, res: Response<{ image: string }>) => {
      const imageName = await uploadPhotoService(req.files, req.params.momentId);
      res.json({ image: imageName });
   }),

};