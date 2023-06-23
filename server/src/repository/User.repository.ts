import { FilterQuery, UpdateQuery } from "mongoose";
import { IUser, UserDocument, UserModel } from "@src/model";
import { ApiException } from "@src/exception/api.exception";

export const UserRepository = {

   create: async (body: Partial<IUser>): Promise<UserDocument> => {
      try {
         return await UserModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findOne: async (filter: FilterQuery<IUser>): Promise<UserDocument | null> => {
      try {
         return await UserModel.findOne(filter);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findById: async (userId: UserDocument["id"]): Promise<UserDocument | null> => {
      try {
         return await UserModel.findById(userId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndUpdate: async (userId: UserDocument["id"], update: UpdateQuery<IUser>): Promise<UserDocument | null> => {
      try {
         return await UserModel.findByIdAndUpdate(userId, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

};
