import express from "express";
import auth from "../../middleware/auth";
import { bookingsControllers } from "./bookings.controllers";

const router = express.Router();

router.post("/", auth("admin", "customer"), bookingsControllers.createBooking);
router.get("/", auth("admin", "customer"), bookingsControllers.getAllBookings);
router.put(
  "/:bookingId",
  auth("admin", "customer"),
  bookingsControllers.updateBooking
);

export const bookingRouter = router;
