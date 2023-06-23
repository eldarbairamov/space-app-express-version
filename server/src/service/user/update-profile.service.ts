import { UserRepository } from "@src/repository";
import { ApiException } from "@src/exception/api.exception";
import { updateProfileValidator } from "@src/validator";
import { IUpdateProfile } from "@src/interface";
import { UserDocument } from "@src/model";

export const updateProfileService = async (userId: UserDocument["id"], body: IUpdateProfile): Promise<IUpdateProfile> => {

   // Validation
   const validation = updateProfileValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Define variables
   const [ userFromDb, username ] = await Promise.all([
      UserRepository.findOne({ _id: userId }),
      UserRepository.findOne({ username: body.username })
   ]);

   // Check if there is nothing to change
   const objToCompare = {
      username: userFromDb!.username,
      name: userFromDb!.name,
      surname: userFromDb!.surname,
   };

   if (JSON.stringify(body) === JSON.stringify(objToCompare)) throw new ApiException("There is nothing to change", 400);

   // Check is username unique
   if (username && username.username !== body.username) throw new ApiException("This username is already in use", 409);

   // Update user
   const updatedUser = await UserRepository.findByIdAndUpdate(userId, body) as UserDocument;

   return {
      username: updatedUser.username,
      name: updatedUser.name,
      surname: updatedUser.surname,
   };
};
