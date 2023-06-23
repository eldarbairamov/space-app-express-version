import { PlanRepository } from "@src/repository";
import { allPlansPresenter } from "@src/presenter";
import { UserDocument } from "@src/model";
import { IPlansResponse } from "@src/interface";
import { IQuery } from "@src/interface/common.interface";

export const getPlansService = async (userId: UserDocument["id"], query: IQuery): Promise<IPlansResponse> => {

   // Find all plans in DB
   const [ plans, count ] = await Promise.all([
      PlanRepository.find({ ownerId: userId }, query),
      PlanRepository.count({ ownerId: userId }, query.searchKey),
   ]);

   // Return presented data to client
   return {
      data: allPlansPresenter(plans),
      count,
   };

};
