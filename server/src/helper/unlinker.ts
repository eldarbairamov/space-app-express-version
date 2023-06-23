import { unlink } from "fs/promises";

export const unlinker = async (path: string) => {
   try {
      await unlink(path);
   } catch (e) {
      const error = e as Error;
      console.log(error.message);
      console.log("Unlink: Error");
   }
};