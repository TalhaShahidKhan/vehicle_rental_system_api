import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.dbCreateBooking(req.body);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message || error,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;

    if (!userId || !role) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const result = await bookingsServices.dbGetAllBookings(userId, role);

    const message =
      role === "admin"
        ? "Bookings retrieved successfully"
        : "Your bookings retrieved successfully";

    if (result.length === 0) {
      res.status(200).json({
        success: true,
        message: message,
        data: [],
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: message,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get bookings",
      error: error.message || error,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const userId = req.user?.id;
    const role = req.user?.role;

    if (!userId || !role) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!bookingId) {
      return res
        .status(400)
        .json({ success: false, message: "Booking ID is required" });
    }

    const result = await bookingsServices.dbUpdateBooking(
      bookingId,
      status,
      userId,
      role
    );

    const message =
      status === "returned"
        ? "Booking marked as returned. Vehicle is now available"
        : "Booking cancelled successfully";

    res.status(200).json({
      success: true,
      message: message,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update booking",
      error: error.message || error,
    });
  }
};

export const bookingsControllers = {
  createBooking,
  getAllBookings,
  updateBooking,
};
