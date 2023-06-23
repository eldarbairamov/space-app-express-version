import bcrypt from "bcrypt";
import { ApiException } from "@src/exception/api.exception";

export const passHasher = async (dry: string): Promise<string> => {
   try {
      return await bcrypt.hash(dry, 8);
   } catch (e) {
      const error = e as Error;
      console.log(error.message);
      throw new ApiException("Bcrypt: Hash error", 500);
   }
};