import { INotesResponse } from "@src/interface";
import { NoteRepository, UserRepository } from "@src/repository";
import { NoteDocument, UserDocument } from "@src/model";
import { IQuery } from "@src/interface/common.interface";
import { allNotesPresenter } from "@src/presenter";

export const deleteNoteService = async (noteId: NoteDocument["id"], userId: UserDocument["id"], query: IQuery): Promise<INotesResponse> => {
   // Delete note
   await NoteRepository.findByIdAndDelete(noteId);

   // Update user and return updated note list
   const [ notes, count ] = await Promise.all([
      NoteRepository.find({ ownerId: userId }, query),
      NoteRepository.count({ ownerId: userId }),
      UserRepository.findByIdAndUpdate(userId, { $pull: { notesIds: noteId } }),
   ]);

   return {
      data: allNotesPresenter(notes),
      count,
   };
};
