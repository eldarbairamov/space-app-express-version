import { ILogin, IOAuthResponse } from "@src/interface";
import { UserDocument } from "@src/model";
import { passComparer } from "@src/helper";
import { accessTokenPairGenerator } from "@src/service";
import { OAuthRepository } from "@src/repository";
import { loginValidator } from "@src/validator";
import { ApiException } from "@src/exception/api.exception";

export const loginService = async (body: ILogin, userFromDb: UserDocument): Promise<IOAuthResponse> => {

   // Validation
   const validation = loginValidator.validate({ ...body });
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Check is user activated
   if (!userFromDb.isActivated) throw new ApiException("Account is not activated", 403);

   // Compare passwords
   const isPasswordSame = await passComparer(body.password!, userFromDb.password!);
   if (!isPasswordSame) throw new ApiException("Wrong email or password", 400);

   // Generate access token pair
   const accessTokenPair = accessTokenPairGenerator(userFromDb.id);

   // Save tokens to DB
   await OAuthRepository.create({
      ...accessTokenPair,
      ownerId: userFromDb.id,
   });

   // Return presented data to client
   return { username: userFromDb.username, ...accessTokenPair };

};