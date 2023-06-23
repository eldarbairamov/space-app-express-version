import { allTaskPresenter } from "@src/presenter";
import { PlanDocument, UserDocument } from "@src/model";
import { ITaskResponse } from "@src/interface";
import { PlanRepository, TaskRepository } from "@src/repository";
import { ApiException } from "@src/exception/api.exception";

export const getTasksService = async (userId: UserDocument["id"], planId: PlanDocument["id"]): Promise<ITaskResponse[]> => {

   // Check is plan exists
   const isPlanExist = await PlanRepository.findById(planId);
   if (!isPlanExist) throw ApiException.NotExistError();

   // Find all tasks in DB
   const tasks = await TaskRepository.find({ ownerId: userId, planId });

   // Return presented data to client
   return allTaskPresenter(tasks);

};
