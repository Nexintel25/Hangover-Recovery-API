import express from "express";
import {adminRegisterController} from "../controllers/auth/admin.controller.js";

const router = express.Router();

router.post("/register", adminRegisterController);

export default router;