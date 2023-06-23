import { MomentRepository, NoteRepository, PlanRepository, UserRepository } from "@src/repository";
import { UserDocument } from "@src/model";
import { IUserInfoResponse } from "@src/interface";

export const getUserInfoService = async (userId: UserDocument["id"]): Promise<IUserInfoResponse> => {

   // Find user in DB and count holding
   const user = await UserRepository.findById(userId) as UserDocument;

   const [ notesCount, plansCount, momentsCount ] = await Promise.all([
      NoteRepository.count({ ownerId: userId }),
      PlanRepository.count({ ownerId: userId }),
      MomentRepository.count({ ownerId: userId }),
   ]);

   // Return presented date to client
   return {
      name: user.name,
      surname: user.surname,
      username: user.username,
      avatar: user.avatar,
      notesCount,
      plansCount,
      momentsCount,
   };

};