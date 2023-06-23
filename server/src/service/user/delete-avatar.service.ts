import path from "node:path";
import { unlink } from "fs/promises";
import { UserRepository } from "@src/repository";
import { UserDocument } from "@src/model";
import { STATIC_PATH } from "@src/constant";
import { fileNameValidator } from "@src/validator";
import { ApiException } from "@src/exception/api.exception";

export const deleteAvatarService = async (userId: UserDocument["id"], body: { fileName: string }): Promise<void> => {

   // Validation
   const validation = fileNameValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Delete avatar from DB
   await UserRepository.findByIdAndUpdate(userId, { avatar: "" });

   // Delete image from hard drive
   const imagePath = path.join(STATIC_PATH, body.fileName);
   await unlink(imagePath).catch(() => {
      throw new ApiException("No such image or directory", 500);
   });

};