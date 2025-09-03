import express from "express";
import { centerRegisterController } from "../controllers/auth/center.controller.js";

const router = express.Router();

router.post("/register", centerRegisterController);

export default router;