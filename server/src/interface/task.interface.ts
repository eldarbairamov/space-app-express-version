import { PlanDocument, TaskDocument } from "@src/model";

export interface ITaskResponse {
   readonly id: TaskDocument["id"];
   readonly title: string;
   readonly isCompleted: boolean;
   readonly planId: PlanDocument["id"];
}

export interface IAddTask {
   readonly planId: PlanDocument["id"];
   readonly title: string;
}