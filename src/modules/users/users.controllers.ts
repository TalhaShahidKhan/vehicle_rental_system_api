import { Request, Response } from "express";
import { usersServices } from "./users.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.dbUserCreate(
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.phone,
      req.body.role
    );
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "it is error",
      error: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("User ID is required");
    const result = await usersServices.dbUserUpdate(
      id,
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.role
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update user", error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("User ID is required");
    const result = await usersServices.dbUserDelete(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete user", error });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.dbUserGetAll();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get all users", error });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("User ID is required");
    const result = await usersServices.dbUserGetById(id);
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get user by id", error });
  }
};

export const usersControllers = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
