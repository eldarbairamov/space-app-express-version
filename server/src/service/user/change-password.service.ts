import { passComparer, passHasher } from "@src/helper";
import { UserRepository } from "@src/repository";
import { UserDocument } from "@src/model";
import { IChangePassword } from "@src/interface";
import { changePasswordValidator } from "@src/validator";
import { ApiException } from "@src/exception/api.exception";

export const changePasswordService = async (userId: UserDocument["id"], body: IChangePassword): Promise<void> => {

   // Validator
   const validation = changePasswordValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Find user in DB
   const user = await UserRepository.findOne({ _id: userId }) as UserDocument;

   // Check is current password correct
   const isCurrentPassCorrect = await passComparer(body.currentPassword, user.password);
   if (!isCurrentPassCorrect) throw new ApiException("Current password is not valid", 400);

   // Check is new password does not same with old
   const isNewPasswordSame = await passComparer(body.newPassword, user.password);
   if (isNewPasswordSame) throw new ApiException("Password is already in use", 400);

   // Hash password
   user.password = await passHasher(body.newPassword);

   // Update user
   await user.save();

};