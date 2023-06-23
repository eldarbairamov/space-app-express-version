import { updateNoteValidator } from "@src/validator";
import { NoteDocument } from "@src/model";
import { IUpdateNote } from "@src/interface";
import { NoteRepository } from "@src/repository";
import { ApiException } from "@src/exception/api.exception";

export const updateNoteService = async (noteId: NoteDocument["id"], body: IUpdateNote) => {

   // Validation
   const validation = updateNoteValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Update note
   await NoteRepository.findByIdAndUpdate(noteId, body);

};