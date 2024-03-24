import { Router } from "express";
import {
  getMessages,
  getUsers,
  loginUser,
  register,
} from "../controller/user.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(loginUser));
router.get("/getUsers/:id", asyncHandler(getUsers));
router.get("/messages/:id", asyncHandler(getMessages));

export default router;
