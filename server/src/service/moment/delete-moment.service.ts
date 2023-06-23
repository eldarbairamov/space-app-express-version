import path from "node:path";
import { MomentDocument, UserDocument } from "@src/model";
import { MomentRepository, UserRepository } from "@src/repository";
import { STATIC_PATH } from "@src/constant";
import { exists, unlinker } from "@src/helper";

export const deleteMomentService = async (userId: UserDocument["id"], momentId: MomentDocument["id"]) => {
   // Find moment in DB
   const moment = await MomentRepository.findById(momentId) as MomentDocument;

   // Define image path, check if image exists and delete
   const imagePath = path.join(STATIC_PATH, (moment.photo ? moment.photo : "nothing"));
   const isImageExists = await exists(imagePath);
   if (isImageExists) await unlinker(imagePath);

   // Delete moment and update user
   await Promise.all([
      moment.delete(),
      UserRepository.findByIdAndUpdate(userId, { $pull: { momentsIds: momentId } }),
   ]);

};