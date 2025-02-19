import express from "express";
import {
  loginUser,
  userRegister,
} from "../Controllers/Auth/LoginController.js";

export const loginRouter = express.Router();

loginRouter.post("/register", userRegister);
loginRouter.post("/login", loginUser);
