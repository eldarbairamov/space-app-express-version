import { notesRequests } from "@src/config/configuration";
import { INote } from "@src/interface";
import { axiosInstance } from "@src/service";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function updateNoteService() {
   const { message } = App.useApp();

   const updateNoteFn = async (activeNote: INote) => {
      try {
         const noteToSave = {
            title: activeNote.title,
            body: activeNote.body,
         };
         await axiosInstance.put<void>(notesRequests.saveNote + activeNote.id, noteToSave);

      } catch (e) {
         message.error(errorCatherFn(e));
      }
   };

   return { updateNoteFn };
}