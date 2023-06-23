import { INoteResponse } from "@src/interface";
import { NoteDocument } from "@src/model";

export const notePresenter = (document: NoteDocument): INoteResponse => {

   const date = new Date(document.updatedAt as string).getTime();

   return {
      id: document.id,
      title: document.title,
      body: document.body,
      lastModified: date,
   };
};

export const allNotesPresenter = (documents: NoteDocument[]): INoteResponse[] => {
   return documents.map(doc => notePresenter(doc));
};