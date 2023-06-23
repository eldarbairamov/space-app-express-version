import { INotesResponse } from "@src/interface";
import { UserDocument } from "@src/model";
import { allNotesPresenter } from "@src/presenter";
import { NoteRepository } from "@src/repository";
import { IQuery } from "@src/interface/common.interface";

export const getNotesService = async (userId: UserDocument["id"], query: IQuery): Promise<INotesResponse> => {

   // Find all notes in DB
   const [ notes, count ] = await Promise.all([
      NoteRepository.find({ ownerId: userId }, query),
      NoteRepository.count({ ownerId: userId }, query.searchKey),
   ]);

   // Return presented data to client
   return {
      data: allNotesPresenter(notes),
      count,
   };

};
