import { useState } from "react";

import { addTaskService } from "@src/service";
import { NoBgInput } from "@src/component";
import { TypedOnChange } from "@src/interface/common.interface";
import { useAppSelector } from "@src/hook";

import style from "./Task-Add.module.scss";
import addLight from "/add-light.svg";
import addDark from "/add-dark.svg";
import addLightDisabled from "/add-light-disabled.svg";
import addDarkDisabled from "/add-dark-disabled.svg";

export function TaskAdd() {
   const { activePlan } = useAppSelector(state => state.planReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const [ taskTitle, setTaskTitle ] = useState<string>("");

   const { addTaskFn } = addTaskService(setTaskTitle);

   const lightCondition = taskTitle === "" ? addLightDisabled : addDark;
   const darkCondition = taskTitle === "" ? addDarkDisabled : addLight;

   return (
      <div className={ style.TaskAdd }>
         <div className={ style.task_add }>
            <img data-disable={ taskTitle } onClick={ () => addTaskFn(activePlan.id, taskTitle) }
                 src={ isDark ? darkCondition : lightCondition }
                 alt={ "add" }/>

            <NoBgInput type={ "text" }
                       id={ "taskTitle" }
                       style={ { textAlign: "left" } }
                       value={ taskTitle }
                       onChange={ (event: TypedOnChange) => setTaskTitle(event.target.value) }
                       placeholder={ "Що плануєш зробити?" }/>
         </div>
      </div>
   );
}
