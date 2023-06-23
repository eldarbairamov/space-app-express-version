import jwt from "jsonwebtoken";
import { UserDocument } from "@src/model";
import { configuration } from "@src/config";
import { IAccessTokenPair } from "@src/interface";
import { ApiException } from "@src/exception/api.exception";

export const accessTokenPairGenerator = (userId: UserDocument["id"]): IAccessTokenPair => {
   try {
      return {
         accessToken: jwt.sign({ userId }, configuration.SECRET_ACCESS_TOKEN_KEY, { expiresIn: "1d" }),
         refreshToken: jwt.sign({ userId }, configuration.SECRET_REFRESH_TOKEN_KEY, { expiresIn: "7d" }),
      };
   } catch (e) {
      const error = e as Error;
      console.log(error.message);
      throw new ApiException("JWT: Error", 500);
   }
};
