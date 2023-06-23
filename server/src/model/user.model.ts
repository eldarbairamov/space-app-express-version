import { HydratedDocument, model, ObjectId, Schema, SchemaTimestampsConfig, Types } from "mongoose";

export interface IUser {
   name: string,
   surname: string,
   username: string,
   email: string,
   password: string,
   isActivated: boolean,
   avatar: string,
   notesIds: ObjectId[],
   plansIds: ObjectId[],
   momentsIds: ObjectId[],
}

export type UserDocument = HydratedDocument<IUser> & SchemaTimestampsConfig

const UserSchema = new Schema<IUser>({
      username: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      isActivated: { type: Boolean, default: false },
      avatar: { type: String, default: "" },
      name: { type: String, default: "" },
      surname: { type: String, default: "" },
      notesIds: [ { type: Types.ObjectId, ref: "Note" } ],
      plansIds: [ { type: Types.ObjectId, ref: "Plan" } ],
      momentsIds: [ { type: Types.ObjectId, ref: "Moment" } ],
   },
   { timestamps: true, versionKey: false });

export const UserModel = model<UserDocument>("User", UserSchema);
