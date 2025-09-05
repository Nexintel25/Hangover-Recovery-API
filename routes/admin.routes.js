import express from "express";
import {adminRegisterController} from "../controllers/auth/admin.controller.js";
import {fetchUserStatsController, fetchAllUsersController} from "../controllers/admin/user.controller.js";
import {fetchNurseStatsController, fetchAllNursesWithStatsController} from "../controllers/admin/nurse.controller.js";

const router = express.Router();

router.post("/register", adminRegisterController);
router.get("/user-stats", fetchUserStatsController);
router.get("/fetch-users", fetchAllUsersController);
router.get("/nurse-stats", fetchNurseStatsController);
router.get("/fetch-nurses", fetchAllNursesWithStatsController);

export default router;