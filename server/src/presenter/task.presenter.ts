import { TaskDocument } from "@src/model";
import { ITaskResponse } from "@src/interface";

export const taskPresenter = (document: TaskDocument): ITaskResponse => {

   return {
      id: document.id,
      title: document.title,
      planId: document.planId,
      isCompleted: document.isCompleted,
   };
};

export const allTaskPresenter = (documents: TaskDocument[]): ITaskResponse[] => {
   return documents.map(doc => taskPresenter(doc));
};