import { PlanRepository } from "@src/repository";
import { PlanDocument } from "@src/model";
import { planPresenter } from "@src/presenter";
import { IPlanResponse } from "@src/interface";

export const getOnePlanService = async (planId: PlanDocument["id"]): Promise<IPlanResponse> => {

   // Find plan in DB
   const plan = await PlanRepository.findById(planId) as PlanDocument;

   // Return presented data to client
   return planPresenter(plan);

};