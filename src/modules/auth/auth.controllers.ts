import { Request, Response } from "express";
import { authService } from "./auth.services";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authService.dbUserLogin(email, password);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const authController = {
  loginUser,
};
