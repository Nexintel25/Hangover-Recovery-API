import express from "express";
import {adminRegisterController} from "../controllers/auth/admin.controller.js";
import {fetchUserStatsController} from "../controllers/admin/user.controller.js";

const router = express.Router();

router.post("/register", adminRegisterController);
router.get("/user-stats", fetchUserStatsController);

export default router;