import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  auth0Id: string;
  email: string;
  name: string;
  role: "admin" | "cajero";
  active: boolean;
}

const userSchema = new Schema<IUser>({
  auth0Id: { type: String, required: true, unique: true },
  email:   { type: String, required: true, unique: true },
  name:    { type: String, required: true },
  role:    { type: String, enum: ["admin", "cajero"], default: "cajero" },
  active:  { type: Boolean, default: true },
}, { timestamps: true });

const User = mongoose.model<IUser>("User", userSchema);
export default User;