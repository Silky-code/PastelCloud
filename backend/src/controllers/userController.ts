import { Request, Response } from "express";
import User from "../models/userModel";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const auth0Id = req.auth?.payload.sub as string;
    const { email, name } = req.body;

    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      res.status(200).json(existingUser);
      return;
    }

    const newUser = new User({ auth0Id, email, name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const auth0Id = req.auth?.payload.sub as string;
    const user = await User.findOne({ auth0Id });
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const auth0Id = req.auth?.payload.sub as string;
    const { name, role } = req.body;

    const user = await User.findOne({ auth0Id });
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    user.name = name;
    if (role) user.role = role;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};