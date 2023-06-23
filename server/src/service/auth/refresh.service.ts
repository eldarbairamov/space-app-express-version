import { UserDocument } from "@src/model";
import { accessTokenPairGenerator, jwtVerifyService } from "@src/service";
import { IAccessTokenPair } from "@src/interface";
import { OAuthRepository } from "@src/repository";
import { REFRESH_TOKEN_TYPE } from "@src/constant";
import { ApiException } from "@src/exception/api.exception";

export const refreshService = async (refreshToken: string): Promise<IAccessTokenPair> => {

   // Check is token exists in request
   if (!refreshToken) throw new ApiException("Token invalid or expired", 401);

   // Check is token exists in DB
   const isRefreshTokenExists = await OAuthRepository.findOne({ refreshToken });
   if (!isRefreshTokenExists) throw new ApiException("Token invalid or expired", 401);

   // Verify and decode token
   const userId = jwtVerifyService(refreshToken, REFRESH_TOKEN_TYPE) as UserDocument["id"];

   // Generate new token pair
   const accessTokenPair = accessTokenPairGenerator(userId);

   // Delete old record and create new
   await Promise.all([
      OAuthRepository.deleteOne({ refreshToken }),
      OAuthRepository.create({ ...accessTokenPair, ownerId: userId }),
   ]);

   // Return data to client
   return accessTokenPair;

};