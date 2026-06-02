import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Business from "../models/businessModel";

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

export const getBusiness = async (req: Request, res: Response): Promise<void> => {
  try {
    let business = await Business.findOne();
    if (!business) {
      business = new Business({ name: "Cacao & Vainilla" });
      await business.save();
    }
    res.json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los datos del negocio" });
  }
};

export const updateBusiness = async (req: Request, res: Response): Promise<void> => {
  try {
    let imageUrl: string | undefined;
    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }

    const updateData = imageUrl ? { ...req.body, imageUrl } : req.body;
    let business = await Business.findOne();

    if (!business) {
      business = new Business({ name: "Cacao & Vainilla", ...updateData });
      await business.save();
    } else {
      Object.assign(business, updateData);
      await business.save();
    }

    res.json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar los datos del negocio" });
  }
};