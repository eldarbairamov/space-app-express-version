import { useEffect } from "react";

import { notesRequests } from "@src/config/configuration";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { INotes } from "@src/interface";
import { axiosInstance } from "@src/service";
import { noteActions } from "@src/redux/slice";
import { useDebounce } from "@src/hook";
import { App } from "antd";
import { errorCatherFn, pleaseWait } from "@src/helper";
import { delay } from "@src/constant";

export function getNotesService() {
   const { searchKey, total } = useAppSelector(state => state.noteReducer);

   const { isLoading } = useAppSelector(state => state.noteReducer);

   const dispatch = useAppDispatch();

   const { message } = App.useApp();

   const debounced = useDebounce(searchKey);

   const getNotesFn = async () => {
      try {
         dispatch(noteActions.setIsLoading(true));
         const { data } = await axiosInstance.get<INotes>(notesRequests.getNotes, {
            params: {
               searchKey: searchKey ? debounced : null,
               limit: total,
            },
         });
         await pleaseWait(delay);
         dispatch(noteActions.setNotes(data));

      } catch (e) {
         dispatch(noteActions.setIsLoading(false));
         message.error(errorCatherFn(e));

      } finally {
         dispatch(noteActions.setIsLoading(false));
      }
   };

   useEffect(() => {
      getNotesFn();
   }, [ debounced, total ]);

   return { isLoading };

}
