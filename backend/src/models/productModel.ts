import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  barcode?: string;
  category?: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  active: boolean;
  providerId?: mongoose.Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
  name:          { type: String, required: true },
  barcode:       { type: String },
  category:      { type: String },
  purchasePrice: { type: Number, default: 0 },
  salePrice:     { type: Number, required: true },
  stock:         { type: Number, required: true, default: 0 },
  minStock:      { type: Number, default: 5 },
  active:        { type: Boolean, default: true },
  providerId:    { type: Schema.Types.ObjectId, ref: "Provider" },
}, { timestamps: true });

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;