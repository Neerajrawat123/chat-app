import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/update-read/", asyncHandler(getMessages));

export default router;
