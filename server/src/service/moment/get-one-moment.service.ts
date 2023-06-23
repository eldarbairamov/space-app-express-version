import { MomentDocument } from "@src/model";
import { momentPresenter } from "@src/presenter/moment.presenter";
import { MomentRepository } from "@src/repository";
import { IMomentResponse } from "@src/interface";

export const getOneMomentService = async (momentId: MomentDocument["id"]): Promise<IMomentResponse> => {

   // Find moment in DB
   const moment = await MomentRepository.findById(momentId) as MomentDocument;

   // Return presented data to client
   return momentPresenter(moment);

};