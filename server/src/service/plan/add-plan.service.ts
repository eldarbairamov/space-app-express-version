import { PlanRepository, UserRepository } from "@src/repository";
import { PlanDocument } from "@src/model";
import { planPresenter } from "@src/presenter";
import { IPlanResponse } from "@src/interface";

export const addPlanService = async (userId: PlanDocument["id"]): Promise<IPlanResponse> => {

   // Save plan to DB
   const plan = await PlanRepository.create({ ownerId: userId });

   // Update user
   await UserRepository.findByIdAndUpdate(userId, { $push: { plansIds: plan._id } });

   // Return presented data to client
   return planPresenter(plan);

};