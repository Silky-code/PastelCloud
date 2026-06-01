import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  const base64 = Buffer.from(file.buffer).toString("base64");
  const dataUri = `data:${file.mimetype};base64,${base64}`;
  const result  = await cloudinary.uploader.upload(dataUri);
  return result.url;
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    let imageUrl: string | undefined;
    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }
    const product = new Product({ ...req.body, imageUrl });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({ active: true }).populate("providerId");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const getProductByBarcode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { barcode } = req.params;
    const product = await Product.findOne({ barcode, active: true });
    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al buscar el producto" });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    let imageUrl: string | undefined;
    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }
    const updateData = imageUrl ? { ...req.body, imageUrl } : req.body;
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, { active: false });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

export const getLowStockProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({
      active: true,
      $expr: { $lte: ["$stock", "$minStock"] },
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos con stock bajo" });
  }
};