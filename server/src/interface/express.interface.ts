import { type Request } from "express";
import fileUpload from "express-fileupload";
import { UserDocument } from "@src/model";

export interface IRequest<B, P, Q> extends Request<P, {}, B, Q> {
   body: B;
   params: P;
   query: Q;
   userId?: UserDocument["id"];
   token?: string;
   files?: fileUpload.FileArray | null | undefined;
   user?: UserDocument;
}