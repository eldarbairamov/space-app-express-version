import { FilterQuery, UpdateQuery } from "mongoose";
import { IMoment, MomentDocument, MomentModel, UserDocument } from "@src/model";
import { ApiException } from "@src/exception/api.exception";

export const MomentRepository = {

   create: async (body: Partial<IMoment>): Promise<MomentDocument> => {
      try {
         return await MomentModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   find: async (filter: FilterQuery<IMoment>, searchKey: string, limit: string | number): Promise<MomentDocument[]> => {
      const filterObj = searchKey ? { ...filter, tag: { $regex: searchKey } } : { ...filter };
      try {
         return await MomentModel.find(filterObj).sort({ createdAt: "desc" }).limit(Number(limit));
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findAllByUserId: async (userId: UserDocument["id"]): Promise<MomentDocument[] | null> => {
      try {
         return await MomentModel.find({ ownerId: userId });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findById: async (momentId: MomentDocument["id"]): Promise<MomentDocument | null> => {
      try {
         return await MomentModel.findById(momentId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndUpdate: async (momentId: MomentDocument["id"], update: UpdateQuery<IMoment>): Promise<MomentDocument | null> => {
      try {
         return await MomentModel.findByIdAndUpdate(momentId, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndDelete: async (momentId: MomentDocument["id"]): Promise<MomentDocument | null> => {
      try {
         return await MomentModel.findByIdAndDelete(momentId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   count: async (filter: FilterQuery<IMoment>, searchKey = ""): Promise<number> => {
      const filterObj = searchKey ? { ...filter, tag: { $regex: searchKey } } : { ...filter };
      try {
         return await MomentModel.count(filterObj);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

};
