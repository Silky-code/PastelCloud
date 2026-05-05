import { Request, Response } from "express";
import Sale from "../models/saleModel";
import Product from "../models/productModel";
import User from "../models/userModel";


export const createSale = async (req: Request, res: Response): Promise<void> => {
  try {
    const auth0Id = req.auth?.payload.sub as string;
    const user = await User.findOne({ auth0Id });
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const { details, paymentMethod } = req.body;

    // Calcular total y actualizar stock
    let total = 0;
    for (const item of details) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        res.status(400).json({ message: `Stock insuficiente para: ${product?.name}` });
        return;
      }
      item.unitPrice = product.salePrice;
      item.subtotal = product.salePrice * item.quantity;
      total += item.subtotal;
      product.stock -= item.quantity;
      await product.save();
    }

    const sale = new Sale({
      userId: user._id,
      total,
      paymentMethod,
      status: "completada",
      details,
    });
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la venta" });
  }
};

export const getSales = async (req: Request, res: Response): Promise<void> => {
  try {
    const sales = await Sale.find()
      .populate("userId", "name email")
      .populate("details.productId", "name")
      .sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las ventas" });
  }
};