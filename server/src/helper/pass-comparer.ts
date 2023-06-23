import bcrypt from "bcrypt";
import { ApiException } from "@src/exception/api.exception";

export const passComparer = async (dry: string, hashed: string): Promise<boolean> => {
   try {
      return await bcrypt.compare(dry, hashed);
   } catch (e) {
      const error = e as Error;
      console.log(error.message);
      throw new ApiException("Bcrypt: Compare error", 500);
   }
};