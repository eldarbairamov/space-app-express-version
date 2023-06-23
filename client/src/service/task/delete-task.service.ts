import { axiosInstance } from "@src/service";
import { tasksRequests } from "@src/config/configuration";
import { ITask } from "@src/interface";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";
import { taskAction } from "@src/redux/slice";
import { useAppDispatch } from "@src/hook";

export function deleteTaskService() {
   const { message } = App.useApp();
   const dispatch = useAppDispatch();

   const deleteTaskFn = async (taskId: ITask["id"]) => {
      try {
         message.loading("Лоудінг...");
         await axiosInstance.delete(tasksRequests.deleteTask + taskId);
         dispatch(taskAction.deleteTask(taskId));
         message.destroy();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { deleteTaskFn };
}
