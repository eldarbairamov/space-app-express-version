import { MomentDocument } from "@src/model";
import { IUpdateMoment } from "@src/interface";
import { updateMomentValidator } from "@src/validator";
import { MomentRepository } from "@src/repository";
import { ApiException } from "@src/exception/api.exception";

export const updateMomentService = async (momentId: MomentDocument["id"], body: IUpdateMoment) => {

   // Validation
   const validation = updateMomentValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Update moment
   await MomentRepository.findByIdAndUpdate(momentId, body);

};