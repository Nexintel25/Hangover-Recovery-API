import express from "express";
import { nurseRegisterController } from "../controllers/auth/nurse.controller.js";

const router = express.Router();

router.post("/register", nurseRegisterController);

export default router;