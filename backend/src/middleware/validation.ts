import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateUserRequest = [
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("email").isEmail().withMessage("El email debe ser válido"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const validateProductRequest = [
  body("name").notEmpty().withMessage("El nombre del producto es requerido"),
  body("salePrice").isNumeric().withMessage("El precio de venta debe ser numérico"),
  body("stock").isNumeric().withMessage("El stock debe ser numérico"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const validateProviderRequest = [
  body("name").notEmpty().withMessage("El nombre del proveedor es requerido"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];