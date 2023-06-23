import { NoteEdit, NoteSidebar, NoteHeaderAdaptive, NoteListAdaptive, ModalWLoader } from "@src/component";
import { useMatchMedia } from "@src/hook";
import { getNotesService } from "@src/service";
import { horizontalPresent } from "@src/animation";
import { motion } from "framer-motion";
import { NOTES_COLOR } from "@src/constant";

import style from "./Notes-Page.module.scss";

export function NotesPage() {
   const { isWidth1000 } = useMatchMedia();

   const { isLoading } = getNotesService();

   return (
      <>
         { !isWidth1000 &&
            <motion.div className={ style.NotesPage }
                        variants={ horizontalPresent }
                        initial={ "initial" }
                        animate={ "animate" }>
               <NoteSidebar/>
               <NoteEdit/>
            </motion.div>
         }

         { isWidth1000 &&
            <motion.div className={ style.NotesPageAdaptive }
                        variants={ horizontalPresent }
                        initial={ "initial" }
                        animate={ "animate" }>
               <NoteHeaderAdaptive/>
               <NoteListAdaptive/>
            </motion.div>
         }

         <ModalWLoader isLoading={ isLoading } color={ NOTES_COLOR }/>
      </>
   );
}
