import { NoBgInput, NoBgButton } from "@src/component";
import { addNoteService } from "@src/service";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { TypedOnChange } from "@src/interface/common.interface";
import { noteActions } from "@src/redux/slice";

import style from "./Note-Header-Adaptive.module.scss";
import addLight from "/add-light.svg";
import addDark from "/add-dark.svg";

export function NoteHeaderAdaptive() {
   const { searchKey } = useAppSelector(state => state.noteReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const { addNoteFn } = addNoteService();

   const handleInput = (event: TypedOnChange) => dispatch(noteActions.setSearchKey(event.target.value));

   return (
      <div className={ style.NoteHeaderAdaptive }>

         <div className={ style.add }>
            <img src={ isDark ? addLight : addDark }
                 alt={ "add" }/>
            <NoBgButton text={ "Додати" }
                        hoverSubject={ "notes" }
                        onClick={ addNoteFn }/>
         </div>

         <div className={ style.search_bar }>
            <NoBgInput type={ "text" }
                       style={ { fontSize: "15px" } }
                       value={ searchKey }
                       onChange={ handleInput }
                       placeholder={ "пошук" }/>
         </div>

      </div>
   );
}
