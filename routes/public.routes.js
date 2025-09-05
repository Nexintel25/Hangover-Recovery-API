import express from "express";
import { userRegisterController } from "../controllers/auth/public.controller.js";
import { createBookingController } from "../controllers/public-user/booking.controller.js";
import { createNurseFeedbackController, getFeedbackByUserController } from "../controllers/public-user/feedback.controller.js";

const router = express.Router();

router.post("/register", userRegisterController);
router.post("/treatment/booking", createBookingController);
router.post("/nurse/feedback", createNurseFeedbackController);
router.post("/fetch-feedbacks", getFeedbackByUserController);

export default router;