import { PlanRepository } from "@src/repository";
import { updatePlanValidator } from "@src/validator";
import { PlanDocument } from "@src/model";
import { ApiException } from "@src/exception/api.exception";

export const updatePlanService = async (planId: PlanDocument["id"], body: { title: string }) => {

   // Validation
   const validation = updatePlanValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Update note
   await PlanRepository.findByIdAndUpdate(planId, { title: body.title });

};