import React, { forwardRef } from "react";

import { INote } from "@src/interface";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { noteActions } from "@src/redux/slice";
import dateHelper from "moment";
import { deleteNoteService } from "@src/service";

import style from "./Note-Item.module.scss";
import deleteDark from '/delete-dark.svg'
import deleteLight from '/delete-light.svg'

interface INoteItem {
   note: INote;
}

export const NoteItem = forwardRef(({ note }: INoteItem, ref: any) => {
   const titleCondition = note.title && note.title.split("").length > 30;

   const dispatch = useAppDispatch();

   const { deleteNoteFn } = deleteNoteService();

   const { activeNote, total, searchKey } = useAppSelector(state => state.noteReducer);

   const deleteNote = async (noteId: INote["id"], e: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
      e.stopPropagation();
      await deleteNoteFn(noteId, total, searchKey);
   };

   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <div ref={ ref } className={ style.NoteItem }
           onClick={ () => dispatch(noteActions.setActiveNoteId(note.id)) }
           data-active={ note.id === activeNote?.id }>

         <div className={ style.left }>
            <p className={ style.note_title }>
               { titleCondition ? note.title.substring(0, 30) + "..." : note.title }
            </p>

            <div className={ style.note_body }>
               <p>{ note.body }</p>
            </div>

            <p className={ style.note_date }>
               { dateHelper(note.lastModified).format("DD-MM-YYYY, HH:mm") }
            </p>
         </div>

         <div className={ style.right }>
            <img className={ style.delete }
                 src={ isDark ? deleteLight : deleteDark }
                 alt={ "delete" }
                 onClick={ (e) => deleteNote(note.id, e) }/>
         </div>

      </div>
   );
});
