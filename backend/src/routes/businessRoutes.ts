import express from "express";
import { getBusiness, updateBusiness } from "../controllers/businessController";
import jwtCheck from "../middleware/auth";
import upload from "../middleware/upload";

const router = express.Router();

router.get("/",  jwtCheck, getBusiness);
router.put("/",  jwtCheck, upload.single("imageFile"), updateBusiness);

export default router;