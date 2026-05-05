import express from "express";
import {
  createProvider, getProviders, updateProvider, deleteProvider,
} from "../controllers/providerController";
import jwtCheck from "../middleware/auth";
import { validateProviderRequest } from "../middleware/validation";

const router = express.Router();

router.get("/",      jwtCheck, getProviders);
router.post("/",     jwtCheck, validateProviderRequest, createProvider);
router.put("/:id",   jwtCheck, validateProviderRequest, updateProvider);
router.delete("/:id", jwtCheck, deleteProvider);

export default router;