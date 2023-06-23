import { notesRequests } from "@src/config/configuration";
import { useAppDispatch } from "@src/hook";
import { INote } from "@src/interface";
import { axiosInstance } from "@src/service";
import { noteActions } from "@src/redux/slice";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";

export function addNoteService() {
   const dispatch = useAppDispatch();
   const { message } = App.useApp();

   const addNoteFn = async () => {
      try {
         message.loading("Лоудінг...");
         const { data } = await axiosInstance.post<INote>(notesRequests.addNote);
         dispatch(noteActions.setSearchKey(""));
         dispatch(noteActions.addNote(data));
         message.destroy();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { addNoteFn };
}
