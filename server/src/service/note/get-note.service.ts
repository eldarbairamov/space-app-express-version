import { NoteDocument } from "@src/model";
import { NoteRepository } from "@src/repository";
import { notePresenter } from "@src/presenter";

export const getNoteService = async (noteId: NoteDocument["id"]) => {
   // Find note
   const note = await NoteRepository.findById(noteId) as NoteDocument

   // Return presented data to client
   return notePresenter(note)
}
