import { Router } from "express";
import {
  findUsers,
  loginUser,
  register,
  // getFriends,
  getChats,
  getMessages,
  checkStatus
} from "../controller/user.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(loginUser));
router.get("/find/user/:id/:name", asyncHandler(findUsers));
router.get("/chats/:id", asyncHandler(getChats));
// router.get("/getFriends/:id", asyncHandler(getFriends));
// router.post("/start-conversation", asyncHandler(startConversation));
router.get("/getMessages/:recieverId/:senderId", asyncHandler(getMessages));
router.get("/isOnline/:id", asyncHandler(checkStatus));
router.get("/chat/seen/:id", asyncHandler(updateMsgStatus));





export default router;
