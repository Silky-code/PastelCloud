import { Request, Response } from "express";
import Provider from "../models/providerModel";

export const createProvider = async (req: Request, res: Response): Promise<void> => {
  try {
    const provider = new Provider(req.body);
    await provider.save();
    res.status(201).json(provider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el proveedor" });
  }
};

export const getProviders = async (req: Request, res: Response): Promise<void> => {
  try {
    const providers = await Provider.find({ active: true });
    res.json(providers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los proveedores" });
  }
};

export const updateProvider = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const provider = await Provider.findByIdAndUpdate(id, req.body, { new: true });
    if (!provider) {
      res.status(404).json({ message: "Proveedor no encontrado" });
      return;
    }
    res.json(provider);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el proveedor" });
  }
};

export const deleteProvider = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Provider.findByIdAndUpdate(id, { active: false });
    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el proveedor" });
  }
};