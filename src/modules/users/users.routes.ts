import express from "express";
import auth from "../../middleware/auth";
import { usersControllers } from "./users.controllers";

const router = express.Router();

router.put("/:id", auth("admin", "customer"), usersControllers.updateUser);
router.delete("/:id", auth("admin"), usersControllers.deleteUser);
router.get("/", auth("admin"), usersControllers.getAllUsers);
// Keeping this as requested by current codebase, though not in API ref.
router.get("/:id", auth("admin", "customer"), usersControllers.getUserById);

export const userRouter = router;
