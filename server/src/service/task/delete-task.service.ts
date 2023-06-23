import { TaskDocument } from "@src/model";
import { PlanRepository, TaskRepository } from "@src/repository";

export const deleteTaskService = async (taskId: TaskDocument["id"]) => {

   // Delete task and update plan
   await Promise.all([
      TaskRepository.findByIdAndDelete(taskId),
      PlanRepository.findOneAndUpdate({ tasksIds: taskId }, { $pull: { tasksIds: taskId } }),
   ]);

};