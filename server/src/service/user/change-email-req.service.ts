import jwt from "jsonwebtoken";
import { ActionTokenRepository, UserRepository } from "@src/repository";
import { CHANGE_EMAIL, EMAIL_CONFIRMATION_TOKEN_TYPE } from "@src/constant";
import { UserDocument } from "@src/model";
import { configuration } from "@src/config";
import { emailValidator } from "@src/validator";
import { emailSender } from "@src/service";
import { ApiException } from "@src/exception/api.exception";

export const changeEmailReqService = async (userId: UserDocument["id"], email: string, clientUrl: string): Promise<void> => {

   // Validation
   const validation = emailValidator.validate({ email });
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Generate link
   const confirmationToken = jwt.sign({ userId, email }, configuration.SECRET_CHANGE_EMAIL_KEY, { expiresIn: "1d" });
   const confirmationLink = `${ clientUrl }/email_confirmation/new?token=${ confirmationToken }`;

   // Find user and save action token to DB
   const [ user ] = await Promise.all([
      UserRepository.findById(userId),
      ActionTokenRepository.create({
         token: confirmationToken,
         tokenType: EMAIL_CONFIRMATION_TOKEN_TYPE,
         ownerId: userId,
      }),
   ]);

   // Send email
   user && await emailSender(email, CHANGE_EMAIL, { confirmationLink, username: user.username });

};
