import { notesRequests } from "@src/config/configuration";
import { useAppDispatch } from "@src/hook";
import { INote, INotes } from "@src/interface";
import { axiosInstance } from "@src/service";
import { noteActions } from "@src/redux/slice";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function deleteNoteService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const deleteNoteFn = async (noteId: INote["id"], total = 30, searchKey = "") => {
      try {
         message.loading("Лоудінг...");
         const { data } = await axiosInstance.delete<INotes>(notesRequests.deleteNote + noteId, {
            params: {
               searchKey,
               limit: total,
            },
         });
         dispatch(noteActions.deleteNote(noteId));
         dispatch(noteActions.setNotes(data));
         message.destroy();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { deleteNoteFn };
}
