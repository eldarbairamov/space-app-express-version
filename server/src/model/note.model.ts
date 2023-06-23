import { HydratedDocument, model, ObjectId, Schema, SchemaDefinitionProperty, SchemaTimestampsConfig, Types } from "mongoose";

export interface INote {
   title: string,
   body: string,
   ownerId: ObjectId,
}

export type NoteDocument = HydratedDocument<INote> & SchemaTimestampsConfig

const NoteSchema = new Schema<INote>({
      title: { type: String, default: "Нова замітка" },
      body: { type: String, default: "" },
      ownerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<ObjectId>,
   },
   { timestamps: true, versionKey: false });

export const NoteModel = model<NoteDocument>("Note", NoteSchema);