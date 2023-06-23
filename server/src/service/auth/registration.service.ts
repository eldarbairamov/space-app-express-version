import { v4 as uuid } from "uuid";
import { passHasher } from "@src/helper";
import { ActionTokenRepository, UserRepository } from "@src/repository";
import { ACTIVATION_TOKEN_TYPE, REGISTRATION } from "@src/constant";
import { registrationValidator } from "@src/validator";
import { IRegistration } from "@src/interface";
import { emailSender } from "@src/service";
import { ApiException } from "@src/exception/api.exception";

export const registrationService = async (body: IRegistration) => {

   // Validation
   const validation = registrationValidator.validate({ ...body });
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Check is username unique
   const username = await UserRepository.findOne({ username: body.username });
   if (username) throw new ApiException("This username is already in use", 409);

   // Hash password
   const hashedPassword = await passHasher(body.password!);

   // Save user to DB
   const candidate = await UserRepository.create({ ...body, password: hashedPassword });

   // Generate activation token
   const activationToken = uuid();

   // Save action token to DB
   await ActionTokenRepository.create({
      token: activationToken,
      tokenType: ACTIVATION_TOKEN_TYPE,
      ownerId: candidate.id,
   });

   // Send activation email
   await emailSender(body.email!, REGISTRATION, { activationCode: activationToken, username: candidate.username });

};
