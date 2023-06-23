import fileUpload from "express-fileupload";
import path from "node:path";
import sharp from "sharp";
import { mkdir } from "fs/promises";
import { UserRepository } from "@src/repository";
import { UserDocument } from "@src/model";
import { STATIC_PATH } from "@src/constant";
import { exists, unlinker } from "@src/helper";
import { ApiException } from "@src/exception/api.exception";

export const uploadAvatarService = async ( image: fileUpload.FileArray | null | undefined, userId: UserDocument["id"] ): Promise<string> => {
   try {
      // Delete prev image from hard drive if exists
      const user = await UserRepository.findById( userId );
      const imagePath = path.join( STATIC_PATH, (user?.avatar ? user.avatar : "nothing") );
      const isImageExists = await exists( imagePath );

      if ( isImageExists ) await unlinker( imagePath );

      // Define avatar variable
      const avatar = image!.avatar as fileUpload.UploadedFile;

      // Generate extension, filename and path for static files
      const ext = path.extname( avatar.name );
      const imageName = Date.now() + ext;
      const isFolderExists = await exists( STATIC_PATH );
      if ( !isFolderExists ) await mkdir( STATIC_PATH, { recursive: true } );

      // Compress and upload image to "static" folder
      await sharp( avatar.data ).jpeg( { quality: 70 } ).toFile( path.join( STATIC_PATH, imageName ) );

      // Save avatar to DB
      await UserRepository.findByIdAndUpdate( userId, { avatar: imageName } );

      // Return filename to client
      return imageName;

   }
   catch ( e ) {
      console.log( e );
      throw new ApiException( "Upload image: Error", 500 );
   }
};