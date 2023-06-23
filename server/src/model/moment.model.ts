import { HydratedDocument, model, ObjectId, Schema, SchemaDefinitionProperty, SchemaTimestampsConfig, Types } from "mongoose";

export interface IMoment {
   title: string,
   date: Date,
   photo: string,
   location: string,
   ownerId: ObjectId,
   tag: string
}

export type MomentDocument = HydratedDocument<IMoment> & SchemaTimestampsConfig

const MomentSchema = new Schema<IMoment>({
   title: { type: String, default: "Новий момент" },
   date: { type: Date, default: Date.now },
   photo: { type: String, default: "" },
   location: { type: String, default: "Локація" },
   tag: { type: String, default: "тег" },
   ownerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<ObjectId>,
}, { timestamps: true, versionKey: false });

export const MomentModel = model<MomentDocument>("Moment", MomentSchema);
