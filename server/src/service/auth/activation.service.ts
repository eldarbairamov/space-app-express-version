import { ActionTokenRepository, UserRepository } from "@src/repository";
import { activationValidator } from "@src/validator";
import { ApiException } from "@src/exception/api.exception";

export const activationService = async (activationCode: string) => {

   // Validation
   const validation = activationValidator.validate({ activationCode });
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Find and delete action token
   const actionTokenInfo = await ActionTokenRepository.findOneAndDelete({ token: activationCode });
   if (!actionTokenInfo) throw new ApiException("Activation code is not valid", 401);

   // Update user status
   await UserRepository.findByIdAndUpdate(actionTokenInfo.ownerId, { isActivated: true });

};