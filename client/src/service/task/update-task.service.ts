import { axiosInstance } from "@src/service";
import { tasksRequests } from "@src/config/configuration";
import { ITask } from "@src/interface";
import { App } from "antd";
import { errorCatherFn } from "@src/helper";
import { useAppDispatch } from "@src/hook";
import { taskAction } from "@src/redux/slice";

export function updateTaskService() {
   const { message } = App.useApp();
   const dispatch = useAppDispatch();

   const updateTaskFn = async (taskId: ITask["id"], status: boolean) => {
      try {
         message.loading("Лоудінг...");
         await axiosInstance.patch(tasksRequests.updateTask + taskId, { isCompleted: status });
         dispatch(taskAction.updateTask(taskId));
         message.destroy();

      } catch (e) {
         message.destroy();
         message.error(errorCatherFn(e));
      }
   };

   return { updateTaskFn };
}
