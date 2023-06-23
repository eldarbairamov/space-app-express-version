import { FilterQuery, UpdateQuery } from "mongoose";
import { ITask, TaskDocument, TaskModel } from "@src/model";
import { ApiException } from "@src/exception/api.exception";

export const TaskRepository = {

   create: async (body: Partial<ITask>): Promise<TaskDocument> => {
      try {
         return await TaskModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndDelete: async (taskId: TaskDocument["id"]): Promise<TaskDocument | null> => {
      try {
         return await TaskModel.findByIdAndDelete(taskId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }

   },

   findByIdAndUpdate: async (taskId: TaskDocument["id"], update: UpdateQuery<ITask>): Promise<TaskDocument | null> => {
      try {
         return await TaskModel.findByIdAndUpdate(taskId, update, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }

   },

   find: async (filter: FilterQuery<ITask>): Promise<TaskDocument[]> => {
      try {
         return await TaskModel.find(filter);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }

   },

   findById: async (taskId: TaskDocument["id"]): Promise<TaskDocument | null> => {
      try {
         return await TaskModel.findById(taskId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   deleteMany: async (filter: FilterQuery<ITask>) => {
      try {
         return await TaskModel.deleteMany(filter)
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   }

};