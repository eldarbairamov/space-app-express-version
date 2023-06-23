import { HydratedDocument, model, ObjectId, Schema, SchemaDefinitionProperty, SchemaTimestampsConfig, Types } from "mongoose";

export interface IPlan {
   title: string,
   ownerId: ObjectId,
   tasksIds: Types.Array<ObjectId>
}

export type PlanDocument = HydratedDocument<IPlan> & SchemaTimestampsConfig

const PlanSchema = new Schema<IPlan>({
      title: { type: String, default: "Новий план" },
      tasksIds: [ { type: Types.ObjectId, ref: "Task" } ],
      ownerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<ObjectId>,
   },
   { timestamps: true, versionKey: false });

export const PlanModel = model<PlanDocument>("Plan", PlanSchema);
