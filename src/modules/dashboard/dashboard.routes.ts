import express from "express";
import auth from "../../middleware/auth";
import { dashboardControllers } from "./dashboard.controllers";

const router = express.Router();

router.get("/stats", auth("admin"), dashboardControllers.getDashboardStats);

export const dashboardRouter = router;
