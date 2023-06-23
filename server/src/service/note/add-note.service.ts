import { INoteResponse } from "@src/interface";
import { NoteRepository, UserRepository } from "@src/repository";
import { UserDocument } from "@src/model";
import { notePresenter } from "@src/presenter";

export const addNoteService = async (userId: UserDocument["id"]): Promise<INoteResponse> => {

   // Save note to DB
   const note = await NoteRepository.create({ ownerId: userId });

   // Update user
   await UserRepository.findByIdAndUpdate(userId, { $push: { notesIds: note.id } });

   // Return presented data to client
   return notePresenter(note);

};