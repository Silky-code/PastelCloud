import express from "express";
import {
  createProduct, getProducts, getProductByBarcode,
  updateProduct, deleteProduct, getLowStockProducts,
} from "../controllers/productController";
import jwtCheck from "../middleware/auth";
import { validateProductRequest } from "../middleware/validation";
import upload from "../middleware/upload";

const router = express.Router();

router.get("/",                  jwtCheck, getProducts);
router.get("/low-stock",         jwtCheck, getLowStockProducts);
router.get("/barcode/:barcode",  jwtCheck, getProductByBarcode);
router.post("/",                 jwtCheck, upload.single("imageFile"), validateProductRequest, createProduct);
router.put("/:id",               jwtCheck, upload.single("imageFile"), validateProductRequest, updateProduct);
router.delete("/:id",            jwtCheck, deleteProduct);

export default router;