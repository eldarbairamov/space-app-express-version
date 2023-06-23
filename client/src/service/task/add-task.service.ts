import { axiosInstance } from "@src/service";
import { ITask } from "@src/interface";
import { tasksRequests } from "@src/config/configuration";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";
import { taskAction } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";
import { TypedSetState } from "@src/interface/common.interface";

export function addTaskService(setTaskTitle: TypedSetState<string>) {
   const { message } = App.useApp();
   const dispatch = useAppDispatch();

   const addTaskFn = async (planId: string, title: string) => {
      if (title !== "") {
         setTaskTitle("");
         const newTask = { planId, title };

         try {
            message.loading("Лоудінг...");
            const { data } = await axiosInstance.post<ITask>(tasksRequests.addTask, newTask);
            dispatch(taskAction.addTask(data));
            message.destroy();
            return data;

         } catch (e) {
            message.destroy();
            message.error(errorCatherFn(e));
         }
      }
   };

   return { addTaskFn };
}
