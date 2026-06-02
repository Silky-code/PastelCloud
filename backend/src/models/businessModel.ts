import mongoose, { Schema, Document } from "mongoose";

export interface IBusiness extends Document {
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
}

const businessSchema = new Schema<IBusiness>({
  name:        { type: String, required: true },
  description: { type: String },
  address:     { type: String },
  phone:       { type: String },
  email:       { type: String },
  imageUrl:    { type: String },
}, { timestamps: true });

const Business = mongoose.model<IBusiness>("Business", businessSchema);
export default Business;