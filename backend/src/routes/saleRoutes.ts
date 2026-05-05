import express from "express";
import { createSale, getSales } from "../controllers/saleController";
import jwtCheck from "../middleware/auth";

const router = express.Router();

router.get("/", jwtCheck, getSales);
router.post("/", jwtCheck, createSale);

export default router;