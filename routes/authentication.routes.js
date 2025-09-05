import express from "express";
import {userVerifyController} from "../controllers/auth/verify.controller.js";

const router = express.Router();

router.post("/verify", userVerifyController);

export default router;