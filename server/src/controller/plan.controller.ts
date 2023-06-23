import expressAsyncHandler from "express-async-handler";
import { Response } from "express";
import { addPlanService, getOnePlanService, getPlansService, updatePlanService } from "@src/service";
import { IDeleteItemBody, IQuery } from "@src/interface/common.interface";
import { IPlanResponse, IPlansResponse, IRequest } from "@src/interface";
import { deletePlanService } from "@src/service/plan/delete-plan.service";

export const planController = {

   addPlan: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response<IPlanResponse>) => {
      const plan = await addPlanService(req.userId);
      res.status(201).json(plan);
   }),

   getPlans: expressAsyncHandler(async (req: IRequest<any, any, IQuery>, res: Response<IPlansResponse>) => {
      const plans = await getPlansService(req.userId, req.query);
      res.json(plans);
   }),

   getOnePlan: expressAsyncHandler(async (req: IRequest<any, { planId: string }, any>, res: Response<IPlanResponse>) => {
      const plan = await getOnePlanService(req.params.planId);
      res.json(plan);
   }),

   updatePlan: expressAsyncHandler(async (req: IRequest<{ title: string }, { planId: string }, any>, res: Response<{ message: string }>) => {
      await updatePlanService(req.params.planId, req.body);
      res.json({ message: "Success" });
   }),

   deletePlan: expressAsyncHandler(async (req: IRequest<IDeleteItemBody, { planId: string }, any | IQuery>, res: Response<IPlansResponse>) => {
      const plans = await deletePlanService(req.params.planId, req.userId, req.query);
      res.json(plans);
   }),

};
