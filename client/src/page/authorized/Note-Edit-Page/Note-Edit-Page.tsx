import { ChangeEvent } from "react";

import { useParams } from "react-router-dom";
import { useAppDispatch, useModal } from "@src/hook";
import { getNoteService, updateNoteService } from "@src/service";
import { noteActions } from "@src/redux/slice";
import { INote } from "@src/interface";
import { BackIcon, FontOptions, Loader, Modal, NoBgInput, TextArea } from "@src/component";
import { motion } from "framer-motion";
import { horizontalPresent } from "@src/animation";
import { NOTES_COLOR } from "@src/constant";

import style from "./Note-Edit-Page.module.scss";

export function NoteEditPage() {
   const { noteId } = useParams<{ noteId: string }>();

   const { isLoading, font, activeNote } = getNoteService(noteId!);

   const dispatch = useAppDispatch();

   const { updateNoteFn } = updateNoteService();

   const handleInputs = (field: string, value: string) => {
      const updatedNote = {
         ...activeNote,
         [field]: value,
         lastModified: Date.now(),
      } as INote;

      dispatch(noteActions.updateNoteAdaptive(updatedNote));
   };

   const { toggleModal } = useModal(isLoading);

   return (
      <>
         <motion.div className={ style.NoteEditPage }
                     variants={ horizontalPresent }
                     initial={ "initial" }
                     animate={ "animate" }>

            <div className={ style.header }>
               <BackIcon/>
               <NoBgInput type={ "text" }
                          maxLength={ 30 }
                          style={ { fontSize: "18px", width: 500, fontWeight: "500" } }
                          id={ "title" }
                          placeholder={ "Заголовок" }
                          value={ activeNote.title ? activeNote.title : "" }
                          onChange={ (e: ChangeEvent<HTMLInputElement>) => handleInputs("title", e.target.value) }
                          onBlur={ () => updateNoteFn(activeNote) }/>

               <FontOptions/>

            </div>

            <TextArea handleInputs={ handleInputs }
                      updateNoteFn={ updateNoteFn }
                      font={ font }
                      activeNote={ activeNote }/>
         </motion.div>

         <Modal isOpen={ isLoading }
                onClose={ toggleModal }
                isBg={ false }>
            <Loader color={ NOTES_COLOR }/>
         </Modal>
      </>
   );
}
