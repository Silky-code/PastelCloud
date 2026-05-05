import express from "express";
import { createUser, getUser, updateUser } from "../controllers/userController";
import jwtCheck from "../middleware/auth";
import { validateUserRequest } from "../middleware/validation";

const router = express.Router();

router.post("/", jwtCheck, validateUserRequest, createUser);
router.get("/", jwtCheck, getUser);
router.put("/", jwtCheck, validateUserRequest, updateUser);

export default router;