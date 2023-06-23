import React from "react";

import { ITask } from "@src/interface";
import { updateTaskService, deleteTaskService } from "@src/service";
import { TypedOnClick } from "@src/interface/common.interface";
import { useAppSelector } from "@src/hook";

import style from "./Task-Item.module.scss";
import complete from "/complete.svg";
import incomplete from "/incomplete.svg";
import deleteDark from '/delete-dark.svg'
import deleteLight from '/delete-light.svg'

interface ITaskItemProps {
   task: ITask;
}

export function TaskItem({ task }: ITaskItemProps) {
   const { updateTaskFn } = updateTaskService();
   const { deleteTaskFn } = deleteTaskService();

   const setTaskStatus = async (taskId: string): Promise<void> => updateTaskFn(taskId, !task.isCompleted)

   const deleteTask = async (e: TypedOnClick<HTMLDivElement>): Promise<void> => {
      e.stopPropagation();
      await deleteTaskFn(task.id);
   };

   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <div className={ style.TaskItem }>

         <div className={ style.task_status }>
            { task.isCompleted
               ?
               <img onClick={ () => setTaskStatus(task.id) }
                    src={ complete }
                    alt="incomplete"/>
               :
               <img onClick={ () => setTaskStatus(task.id) }
                    src={ incomplete }
                    alt="incomplete"/>
            }
         </div>

         <div className={ style.task_title }>
            <p> { task.title } </p>
         </div>

         <img className={ style.delete }
              src={ isDark ? deleteLight : deleteDark }
              alt={ "delete" }
              onClick={ (e: React.MouseEvent<HTMLDivElement>) => deleteTask(e) }/>

      </div>
   );
}
