import { HydratedDocument, model, ObjectId, Schema, SchemaDefinitionProperty, SchemaTimestampsConfig, Types } from "mongoose";

export interface ITask {
   title: string,
   isCompleted: boolean
   ownerId: ObjectId,
   planId: ObjectId,
}

export type TaskDocument = HydratedDocument<ITask> & SchemaTimestampsConfig

const TaskSchema = new Schema<ITask>({
      title: String,
      isCompleted: { type: Boolean, default: false },
      planId: { type: Types.ObjectId, ref: "Plan" } as SchemaDefinitionProperty<ObjectId>,
      ownerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<ObjectId>,
   },
   { versionKey: false, timestamps: true });

export const TaskModel = model<TaskDocument>("Task", TaskSchema);