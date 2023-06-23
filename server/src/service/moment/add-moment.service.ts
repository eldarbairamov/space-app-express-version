import { MomentRepository, UserRepository } from "@src/repository";
import { UserDocument } from "@src/model";
import { momentPresenter } from "@src/presenter/moment.presenter";

export const addMomentService = async (userId: UserDocument["id"]) => {

   // Save moment to DB
   const moment = await MomentRepository.create({ ownerId: userId });

   // Update user
   await UserRepository.findByIdAndUpdate(userId, { $push: { momentsIds: moment.id } });

   // Return presented data to client
   return momentPresenter(moment);

};