import { FilterQuery, UpdateQuery } from "mongoose";
import { INote, NoteDocument, NoteModel } from "@src/model";
import { ApiException } from "@src/exception/api.exception";
import { IQuery } from "@src/interface/common.interface";

export const NoteRepository = {

   create: async (body: Partial<INote>): Promise<NoteDocument> => {
      try {
         return await NoteModel.create(body);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   find: async (filter: FilterQuery<INote>, query: IQuery): Promise<NoteDocument[]> => {
      const filterObj = query.searchKey ? { ...filter, title: { $regex: query.searchKey, $options: "i" } } : { ...filter };
      try {
         return await NoteModel.find(filterObj).sort({ updatedAt: "desc" }).limit(Number(query.limit));
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findById: async (noteId: NoteDocument["id"]): Promise<NoteDocument | null> => {
      try {
         return await NoteModel.findById(noteId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndUpdate: async (noteId: NoteDocument["id"], body: UpdateQuery<INote>): Promise<NoteDocument | null> => {
      try {
         return await NoteModel.findByIdAndUpdate(noteId, body, { new: true });
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   findByIdAndDelete: async (noteId: NoteDocument["id"]): Promise<NoteDocument | null> => {
      try {
         return await NoteModel.findByIdAndDelete(noteId);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

   count: async (filter: FilterQuery<INote>, searchKey = ""): Promise<number> => {
      const filterObj = searchKey ? { ...filter, title: { $regex: searchKey, $options: "i" } } : { ...filter };
      try {
         return await NoteModel.count(filterObj);
      } catch (e) {
         const error = e as Error;
         console.log(error.message);
         throw ApiException.DatabaseError();
      }
   },

};
