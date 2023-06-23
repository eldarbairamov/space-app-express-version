import { HydratedDocument, model, ObjectId, Schema, SchemaDefinitionProperty, SchemaTimestampsConfig, Types } from "mongoose";

export interface IActionToken {
   token: string,
   tokenType: string,
   ownerId: ObjectId,
}

export type ActionTokenDocument = HydratedDocument<IActionToken> & SchemaTimestampsConfig

const actionTokenSchema = new Schema<IActionToken>({
      token: String,
      tokenType: String,
      ownerId: { type: Types.ObjectId, ref: "User" } as SchemaDefinitionProperty<ObjectId>,
   },
   { timestamps: true, versionKey: false });

export const ActionTokenModel = model<ActionTokenDocument>("ActionToken", actionTokenSchema);
