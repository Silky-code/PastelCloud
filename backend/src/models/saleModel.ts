import mongoose, { Schema, Document } from "mongoose";

export interface ISaleDetail {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface ISale extends Document {
  userId: mongoose.Types.ObjectId;
  saleDate: Date;
  total: number;
  paymentMethod: "efectivo" | "tarjeta" | "otro";
  status: "completada" | "cancelada" | "pendiente";
  details: ISaleDetail[];
}

const saleDetailSchema = new Schema<ISaleDetail>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity:  { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  subtotal:  { type: Number, required: true },
});

const saleSchema = new Schema<ISale>({
  userId:        { type: Schema.Types.ObjectId, ref: "User", required: true },
  saleDate:      { type: Date, default: Date.now },
  total:         { type: Number, required: true },
  paymentMethod: { type: String, enum: ["efectivo", "tarjeta", "otro"], default: "efectivo" },
  status:        { type: String, enum: ["completada", "cancelada", "pendiente"], default: "pendiente" },
  details:       [saleDetailSchema],
}, { timestamps: true });

const Sale = mongoose.model<ISale>("Sale", saleSchema);
export default Sale;