import cors from "cors";
import express from "express";
import config from "./config";
import initDB from "./config/db";
import { authRouter } from "./modules/auth/auth.routes";
import { bookingRouter } from "./modules/bookings/bookings.routes";
import { userRouter } from "./modules/users/users.routes";
import { vehicleRouter } from "./modules/vehicles/vehicles.routes";

const app = express();
const port = config.port;

app.use(cors());
app.use(express.json());

initDB();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vehicles", vehicleRouter);
app.use("/api/v1/bookings", bookingRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
