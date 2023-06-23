import { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@src/hook";
import { noteActions } from "@src/redux/slice";
import { INote } from "@src/interface";
import { FontOptions, NoBgInput, TextArea } from "@src/component";
import { updateNoteService } from "@src/service";
import { TypedOnChange } from "@src/interface/common.interface";

import style from "./Note-Edit.module.scss";

export const NoteEdit: FC = () => {
   const { activeNote, notes, font } = useAppSelector(state => state.noteReducer);

   const { updateNoteFn } = updateNoteService();

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(noteActions.setDefaultNote(notes[0]));
   }, []);


   const handleInputs = (field: string, value: string) => {
      const updatedNote = {
         ...activeNote,
         [field]: value,
         lastModified: Date.now(),
      } as INote;

      dispatch(noteActions.updateNote(updatedNote));
   };

   if (!activeNote) return (
      <div className={ style.no_notes_wrapper }>
         <p> Пусто.. </p>
      </div>
   );

   return (
      <div className={ style.NoteEdit }>
         <div className={ style.note_edit }>

            <div className={ style.header }>

               <NoBgInput type={ "text" }
                          style={ { fontSize: "18px", width: "500px", fontWeight: "500" } }
                          id={ "title" }
                          maxLength={30}
                          placeholder={'Заголовок'}
                          value={ activeNote.title }
                          onChange={ (event: TypedOnChange) => handleInputs("title", event.target.value) }
                          onBlur={ () => updateNoteFn(activeNote) }/>

               <FontOptions/>

            </div>

            <TextArea updateNoteFn={ updateNoteFn }
                      activeNote={ activeNote }
                      handleInputs={ handleInputs }
                      font={ font }/>
         </div>
      </div>
   );
};
