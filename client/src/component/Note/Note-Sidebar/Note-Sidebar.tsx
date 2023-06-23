import { useAppDispatch, useAppSelector } from "@src/hook";
import { noteActions } from "@src/redux/slice";
import { NoBgButton, NoteList } from "@src/component";
import { NoBgInput } from "@src/component";
import { addNoteService } from "@src/service";
import { TypedOnChange } from "@src/interface/common.interface";

import style from "./Note-Sidebar.module.scss";
import addLight from "/add-light.svg";
import addDark from "/add-dark.svg";

export function NoteSidebar() {
   const { searchKey } = useAppSelector(state => state.noteReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const { addNoteFn } = addNoteService();

   const handleInput = async (event: TypedOnChange) => dispatch(noteActions.setSearchKey(event.target.value))

   return (
      <div className={ style.NoteSidebar }>

         <div className={ style.note_sidebar }>
            <div className={ style.header }>
               <img src={ isDark ? addLight : addDark }
                    alt={ "add" }/>
               <NoBgButton text={ "Додати" }
                           hoverSubject={ "notes" }
                           onClick={ addNoteFn }/>
            </div>

            <NoteList/>

            <div className={ style.bottom }>
               <NoBgInput type={ "text" }
                          value={ searchKey }
                          placeholder={ "пошук" }
                          onChange={ handleInput }
                          style={ { fontSize: "15px" } }/>
            </div>
         </div>
      </div>
   );
}
