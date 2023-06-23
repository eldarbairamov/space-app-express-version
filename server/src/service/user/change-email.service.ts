import jwt from "jsonwebtoken";
import { ActionTokenRepository, UserRepository } from "@src/repository";
import { configuration } from "@src/config";
import { changeEmailValidator } from "@src/validator";
import { ApiException } from "@src/exception/api.exception";

export const changeEmailService = async (confirmationToken: string): Promise<void> => {

   // Validation
   const validation = changeEmailValidator.validate({ confirmationToken });
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Decoding token
   const { userId, email } = jwt.verify(confirmationToken, configuration.SECRET_CHANGE_EMAIL_KEY) as { userId: string, email: string };

   if (!userId && !email) throw new ApiException("Token invalid or expired", 401);

   // Delete action token
   const actionTokenInfo = await ActionTokenRepository.findOneAndDelete({ token: confirmationToken });
   if (!actionTokenInfo) throw new ApiException("Token invalid or expired", 401);

   // Update email
   await UserRepository.findByIdAndUpdate(userId, { email: email });

};
