import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
import { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE } from "@src/constant";
import { configuration } from "@src/config";
import { ApiException } from "@src/exception/api.exception";

export const jwtVerifyService = (token: string, type: string) => {

   // Define the secret key variable
   let secretKey = "" as Secret;

   // Define the secret key value
   if (type === ACCESS_TOKEN_TYPE) secretKey = configuration.SECRET_ACCESS_TOKEN_KEY;
   if (type === REFRESH_TOKEN_TYPE) secretKey = configuration.SECRET_REFRESH_TOKEN_KEY;

   // Verify and decode the token
   try {
      const { userId } = jwt.verify(token, secretKey) as { userId: string };
      return userId;

   } catch (e) {
      throw new ApiException("Token invalid or expired", 401);
   }
};