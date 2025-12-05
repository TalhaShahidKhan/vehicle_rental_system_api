import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.services";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.dbCreateVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create vehicle",
      error: error.message || error,
    });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.dbGetAllVehicles();
    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get vehicles",
      error: error.message || error,
    });
  }
};

const getVehicleById = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    if (!vehicleId) {
      return res
        .status(400)
        .json({ success: false, message: "Vehicle ID is required" });
    }
    const result = await vehiclesServices.dbGetVehicleById(vehicleId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found", // Not strictly in API ref but standard
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get vehicle",
      error: error.message || error,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    if (!vehicleId) {
      return res
        .status(400)
        .json({ success: false, message: "Vehicle ID is required" });
    }
    const result = await vehiclesServices.dbUpdateVehicle(vehicleId, req.body);
    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update vehicle",
      error: error.message || error,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    if (!vehicleId) {
      return res
        .status(400)
        .json({ success: false, message: "Vehicle ID is required" });
    }
    // Note: The logic to check for active bookings should be in the service or here.
    // Spec says: "Delete vehicle (only if no active bookings exist)"
    // We will assume service handles this check or DB constraints prevent it if configured (CASCADE might delete bookings, but spec says prevent).
    // The DB schema says: vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE
    // This contradicts "only if no active bookings exist" if we rely purely on DB.
    // We must manually check for active bookings before deleting.

    // For now we will implement the service to check/delete.
    await vehiclesServices.dbDeleteVehicle(vehicleId);
    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete vehicle",
      error: error.message || error,
    });
  }
};

export const vehiclesControllers = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
