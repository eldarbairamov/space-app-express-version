import { TaskDocument } from "@src/model";
import { updateTaskValidator } from "@src/validator";
import { TaskRepository } from "@src/repository";
import { ApiException } from "@src/exception/api.exception";

export const updateTaskService = async (taskId: TaskDocument["id"], body: { isCompleted: string }) => {

   // Validation
   const validation = updateTaskValidator.validate(body);
   if (validation.error) throw new ApiException(validation.error.message, 400);

   // Update task
   await TaskRepository.findByIdAndUpdate(taskId, { isCompleted: body.isCompleted });

};