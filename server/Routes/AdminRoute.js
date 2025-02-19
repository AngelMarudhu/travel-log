import express from "express";
import {
  authenticateUser,
  authorizeRoles,
} from "../Middleware/Authenticate.js";
import { getAllUsers } from "../Controllers/Admin/AdminController.js";

export const adminRouter = express.Router();

adminRouter.get(
  "/get-all-users",
  authenticateUser,
  authorizeRoles("admin"),
  getAllUsers
);
