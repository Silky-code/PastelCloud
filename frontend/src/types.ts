export type User = {
  _id: string;
  auth0Id: string;
  email: string;
  name: string;
  role: "admin" | "cajero";
  active: boolean;
};

export type Product = {
  _id: string;
  name: string;
  barcode?: string;
  category?: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  active: boolean;
  imageUrl?: string;
  providerId?: string;
};

export type Provider = {
  _id: string;
  name: string;
  contact?: string;
  phone?: string;
  email?: string;
  address?: string;
  active: boolean;
};

export type SaleDetail = {
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type Sale = {
  _id: string;
  userId: string;
  saleDate: string;
  total: number;
  paymentMethod: "efectivo" | "tarjeta" | "otro";
  status: "completada" | "cancelada" | "pendiente";
  details: SaleDetail[];
};