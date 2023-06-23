import { FilterQuery } from "mongoose";
import { ActionTokenDocument, ActionTokenModel, IActionToken, OAuthDocument } from "@src/model";
import { ApiException } from "@src/exception/api.exception";
import { DeleteResult } from "mongodb";

export const ActionTokenRepository = {

   create: async (body: IActionToken): Promise<ActionTokenDocument> => {
      try {
         return await ActionTokenModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findOneAndDelete: async (filter: FilterQuery<IActionToken>): Promise<ActionTokenDocument | null> => {
      try {
         return await ActionTokenModel.findOneAndDelete(filter);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   deleteMany: async (filter: FilterQuery<OAuthDocument>): Promise<DeleteResult> => {
      try {
         return await ActionTokenModel.deleteMany(filter);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

};
