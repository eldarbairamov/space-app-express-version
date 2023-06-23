import { TaskItem } from "@src/component";
import { useAppSelector } from "@src/hook";
import { v4 as uuid } from "uuid";

import style from "./Task-List.module.scss";

export function TaskList() {
   const { tasks } = useAppSelector(state => state.taskReducer);

   return (
      <div className={ style.TaskList }>
         <div className={ style.task_list }>
            { tasks && tasks.map(task => (
               <TaskItem key={ uuid() }
                         task={ task }/>
            )) }
         </div>
      </div>
   );
}
