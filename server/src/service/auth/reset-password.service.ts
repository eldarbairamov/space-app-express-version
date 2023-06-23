import { passHasher } from "@src/helper";
import { resetPasswordValidator } from "@src/validator";
import { ActionTokenRepository, UserRepository } from "@src/repository";
import { IResetPassword } from "@src/interface";
import { ApiException } from "@src/exception/api.exception";

export const resetPasswordService = async (body: IResetPassword) => {

   // Validation
   const validation = resetPasswordValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Delete action token
   const actionTokenInfo = await ActionTokenRepository.findOneAndDelete({ token: body.resetPasswordToken });
   if (!actionTokenInfo) throw new ApiException("Token invalid or expired", 401);

   // Define token owner ID
   const ownerId = actionTokenInfo.ownerId;

   // Hash password
   const hashedPassword = await passHasher(body.password);

   // Update password
   await UserRepository.findByIdAndUpdate(ownerId, { password: hashedPassword });

};