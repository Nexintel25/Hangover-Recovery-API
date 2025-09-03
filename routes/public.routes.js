import express from "express";
import { userRegisterController } from "../controllers/auth/public.controller.js";

const router = express.Router();

router.post("/register", userRegisterController);

export default router;