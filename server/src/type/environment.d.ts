import { Secret } from "jsonwebtoken";
import fileUpload from "express-fileupload";
import { UserDocument } from "../model";

export {};

declare global {
   namespace NodeJS {
      interface ProcessEnv {
         PORT: number,
         MONGO_URI: string,
         API_URL: string,
         CLIENT_URL: string,
         EMAIL_SERVICE_USER: string,
         EMAIL_SERVICE_PASS: string
         SECRET_ACCESS_TOKEN_KEY: Secret,
         SECRET_REFRESH_TOKEN_KEY: Secret,
         SECRET_FORGOT_PASS_KEY: Secret,
         SECRET_CHANGE_EMAIL_KEY: Secret,
      }
   }
}

declare global {
   namespace Express {
      interface Request {
         user?: UserDocument;
         token?: string;
         userId?: UserDocument["id"];
         files?: fileUpload.FileArray | null | undefined;
      }
   }
}