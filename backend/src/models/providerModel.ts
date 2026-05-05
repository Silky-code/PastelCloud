import mongoose, { Schema, Document } from "mongoose";

export interface IProvider extends Document {
  name: string;
  contact?: string;
  phone?: string;
  email?: string;
  address?: string;
  active: boolean;
}

const providerSchema = new Schema<IProvider>({
  name:    { type: String, required: true },
  contact: { type: String },
  phone:   { type: String },
  email:   { type: String },
  address: { type: String },
  active:  { type: Boolean, default: true },
}, { timestamps: true });

const Provider = mongoose.model<IProvider>("Provider", providerSchema);
export default Provider;