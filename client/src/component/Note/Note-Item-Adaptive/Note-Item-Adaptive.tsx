import React, { forwardRef } from "react";

import { INote } from "@src/interface";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { noteActions } from "@src/redux/slice";
import dateHelper from "moment";
import { deleteNoteService } from "@src/service";
import { AuthorizedRouter, AuthorizedRoutesEnum } from "@src/router";

import style from "./Note-Item-Adaptive.module.scss";
import deleteDark from '/delete-dark.svg'
import deleteLight from '/delete-light.svg'

interface NoteItemAdaptive {
   note: INote;
}

export const NoteItemAdaptive = forwardRef(({ note }: NoteItemAdaptive, ref: any) => {
   const titleCondition = note.title && note.title.split("").length > 30;

   const dispatch = useAppDispatch();

   const { deleteNoteFn } = deleteNoteService();

   const deleteNote = async (noteId: INote["id"], e: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
      e.stopPropagation();
      await deleteNoteFn(noteId);
   };

   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <div ref={ ref } className={ style.NoteItemAdaptive }
           onClick={ () => {
              AuthorizedRouter.navigate(AuthorizedRoutesEnum.NoteEditPage + note.id);
              dispatch(noteActions.setActiveNoteId(note.id));
           } }>

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
})
