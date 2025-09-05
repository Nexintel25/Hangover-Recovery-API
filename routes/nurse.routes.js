import express from "express";
import { nurseRegisterController } from "../controllers/auth/nurse.controller.js";
import { getFeedbackForNurseController } from "../controllers/nurse/feedback.controller.js";
const router = express.Router();

router.post("/register", nurseRegisterController);
router.post("/feedback", getFeedbackForNurseController);

export default router;