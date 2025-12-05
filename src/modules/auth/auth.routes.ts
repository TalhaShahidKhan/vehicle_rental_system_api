import express from "express";
import { usersControllers } from "../users/users.controllers";
import { authController } from "./auth.controllers";

const router = express.Router();
router.post("/signin", authController.loginUser);
router.post("/signup", usersControllers.createUser);
export const authRouter = router;
