import { useEffect } from "react";
import { noteActions } from "@src/redux/slice";
import { axiosInstance } from "@src/service";
import { INote } from "@src/interface";
import { notesRequests } from "@src/config/configuration";
import { errorCatherFn, pleaseWait } from "@src/helper";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { App } from "antd";
import { delay } from "@src/constant";

export function getNoteService(noteId: string) {
   const { activeNote, font, isLoading } = useAppSelector(state => state.noteReducer);

   const dispatch = useAppDispatch();

   const { message } = App.useApp();

   const getNoteFn = async () => {
      try {
         dispatch(noteActions.setIsLoading(true));
         const { data } = await axiosInstance.get<INote>(notesRequests.getNote + noteId);
         dispatch(noteActions.setActiveNote(data));
         await pleaseWait(delay);


      } catch (e) {
         dispatch(noteActions.setIsLoading(false));
         message.error(errorCatherFn(e));

      } finally {
         dispatch(noteActions.setIsLoading(false));
      }
   };

   useEffect(() => {
      getNoteFn();
   }, []);

   return { activeNote, font, isLoading };

}
