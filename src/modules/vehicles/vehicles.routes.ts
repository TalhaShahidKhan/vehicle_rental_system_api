import express from "express";
import auth from "../../middleware/auth";
import { vehiclesControllers } from "./vehicles.controllers";

const router = express.Router();

router.post("/", auth("admin"), vehiclesControllers.createVehicle);
router.get("/", vehiclesControllers.getAllVehicles);
router.get("/:vehicleId", vehiclesControllers.getVehicleById);
router.put("/:vehicleId", auth("admin"), vehiclesControllers.updateVehicle);
router.delete("/:vehicleId", auth("admin"), vehiclesControllers.deleteVehicle);

export const vehicleRouter = router;
