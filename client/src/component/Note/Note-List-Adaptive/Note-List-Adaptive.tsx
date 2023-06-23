import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { NoteItemAdaptive } from "../Note-Item-Adaptive/Note-Item-Adaptive";
import { noteActions } from "@src/redux/slice";
import { useObserver } from "@src/hook/use-observer";

import style from "./Note-List-Adaptive.module.scss";
import emptyDark from "/empty-dark.svg";
import emptyLight from "/empty-light.svg";

export function NoteListAdaptive() {
   const { notes } = useAppSelector(state => state.noteReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const { lastElemRef } = useObserver(() => dispatch(noteActions.next()))

   return (
      <div className={ style.NoteListAdaptive }>
         { Boolean(notes.length) &&
            <div className={ style.note_list_adaptive }>
               { notes &&
                  notes.map((item, index) => {
                     if (notes.length === index + 1) {
                        return <NoteItemAdaptive ref={ lastElemRef }
                                                 key={ uuid() }
                                                 note={ item }/>
                     } else {
                        return <NoteItemAdaptive key={ uuid() }
                                                 note={ item }/>
                     }
                  })
               }
            </div>
         }

         { Boolean(!notes.length) &&
            <div className={ style.no_notes_wrapper }>
               <img src={ isDark ? emptyLight : emptyDark }
                    alt={ "empty" }
                    style={ { width: "80px" } }/>
               <p> Пусто.. </p>
            </div>
         }
      </div>
   );
}
