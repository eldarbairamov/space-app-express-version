import { PlanRepository, TaskRepository, UserRepository } from "@src/repository";
import { allPlansPresenter } from "@src/presenter";
import { PlanDocument, UserDocument } from "@src/model";
import { IPlansResponse } from "@src/interface";
import { IQuery } from "@src/interface/common.interface";

export const deletePlanService = async (planId: PlanDocument["id"], userId: UserDocument["id"], query: IQuery): Promise<IPlansResponse> => {
   // Delete note
   await PlanRepository.findByIdAndDelete(planId);

   // Update user and return updated note list
   const [ plans, count ] = await Promise.all([
      PlanRepository.find({ ownerId: userId }, query),
      PlanRepository.count({ ownerId: userId }),
      TaskRepository.deleteMany({ planId }),
      UserRepository.findByIdAndUpdate(userId, { $pull: { plansIds: planId } }),
   ]);

   return {
      data: allPlansPresenter(plans),
      count,
   };
};
