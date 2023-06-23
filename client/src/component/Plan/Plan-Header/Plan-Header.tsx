import { NoBgInput, NoBgButton } from "@src/component";
import { addPlanService } from "@src/service";
import { useAppDispatch, useAppSelector } from "@src/hook";
import { planAction } from "@src/redux/slice";
import { TypedOnChange } from "@src/interface/common.interface";

import style from "./Plan-Header.module.scss";
import addLight from "/add-light.svg";
import addDark from "/add-dark.svg";

export function PlanHeader() {
   const { searchKey } = useAppSelector(state => state.planReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const { addPlanFn } = addPlanService();

   const handleInput = (event: TypedOnChange) => dispatch(planAction.setSearchKey(event.target.value));

   return (
      <div className={ style.PlanHeader }>

         <div className={style.add}>
            <img src={ isDark ? addLight : addDark }
                 alt={ "add" }/>
            <NoBgButton text={ "Додати" }
                        hoverSubject={ "plan" }
                        onClick={ addPlanFn }/>
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
