import jwt from "jsonwebtoken";
import { UserDocument } from "@src/model";
import { configuration } from "@src/config";
import { ActionTokenRepository } from "@src/repository";
import { FORGOT_PASSWORD, RESET_PASSWORD_TOKEN_TYPE } from "@src/constant";
import { emailSender } from "@src/service";

export const forgotPasswordService = async (emailFromReq: string, userFromDb: UserDocument, clientUrl: string) => {
   // Generate link
   const resetPasswordToken = jwt.sign({ userId: userFromDb._id }, configuration.SECRET_FORGOT_PASS_KEY, { expiresIn: "1d" });
   const resetPasswordLink = `${ clientUrl }/password_reset/new?token=${ resetPasswordToken }`;

   // Save action token to DB
   await ActionTokenRepository.create({
      token: resetPasswordToken,
      tokenType: RESET_PASSWORD_TOKEN_TYPE,
      ownerId: userFromDb.id,
   });

   // Send email
   await emailSender(emailFromReq, FORGOT_PASSWORD, { resetPasswordLink, username: userFromDb.username });

};
