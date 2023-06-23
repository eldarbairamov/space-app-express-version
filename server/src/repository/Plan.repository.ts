import { FilterQuery, UpdateQuery } from "mongoose";
import { IPlan, PlanDocument, PlanModel } from "@src/model";
import { ApiException } from "@src/exception/api.exception";
import { IQuery } from "@src/interface/common.interface";

export const PlanRepository = {

   create: async (body: Partial<IPlan>): Promise<PlanDocument> => {
      try {
         return await PlanModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   find: async (filter: FilterQuery<IPlan>, query: IQuery): Promise<PlanDocument[]> => {
      const filterObj = query.searchKey ? { ...filter, title: { $regex: query.searchKey, $options: "i" } } : { ...filter };
      try {
         return await PlanModel.find(filterObj).sort({ updatedAt: "desc" }).limit(Number(query.limit));
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findById: async (planId: PlanDocument["id"]): Promise<PlanDocument | null> => {
      try {
         return await PlanModel.findById(planId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndUpdate: async (planId: PlanDocument["id"], update: UpdateQuery<IPlan>): Promise<PlanDocument | null> => {
      try {
         return await PlanModel.findByIdAndUpdate(planId, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findOneAndUpdate: async (filter: FilterQuery<IPlan>, update: UpdateQuery<IPlan>): Promise<PlanDocument | null> => {
      try {
         return await PlanModel.findOneAndUpdate(filter, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndDelete: async (planId: PlanDocument["id"]): Promise<PlanDocument | null> => {
      try {
         return await PlanModel.findByIdAndDelete(planId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   count: async (filter: FilterQuery<IPlan>, searchKey = ""): Promise<number> => {
      const filterObj = searchKey ? { ...filter, title: { $regex: searchKey, $options: "i" } } : { ...filter };
      try {
         return await PlanModel.count(filterObj);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

};
