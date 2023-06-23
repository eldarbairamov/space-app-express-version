import { FilterQuery } from "mongoose";
import { DeleteResult } from "mongodb";
import { IOAuth, OAuthDocument, OAuthModel } from "@src/model";
import { ApiException } from "@src/exception/api.exception";

export const OAuthRepository = {

   create: async (body: IOAuth): Promise<OAuthDocument> => {
      try {
         return await OAuthModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   deleteOne: async (filter: FilterQuery<OAuthDocument>): Promise<DeleteResult> => {
      try {
         return await OAuthModel.deleteOne(filter);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   deleteMany: async (filter: FilterQuery<OAuthDocument>): Promise<DeleteResult> => {
      try {
         return await OAuthModel.deleteMany(filter);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findOne: async (filter: FilterQuery<OAuthDocument>): Promise<OAuthDocument | null> => {
      try {
         return await OAuthModel.findOne(filter).lean();
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

};