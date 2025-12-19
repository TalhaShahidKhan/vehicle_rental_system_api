import { Request, Response } from "express";
import { dashboardServices } from "./dashboard.services";

const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const stats = await dashboardServices.dbGetDashboardStats();
    res.status(200).json({
      success: true,
      message: "Dashboard statistics retrieved successfully",
      data: stats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard statistics",
      error: error.message || error,
    });
  }
};

export const dashboardControllers = {
  getDashboardStats,
};
