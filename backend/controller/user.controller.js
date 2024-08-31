import {
  and,
  arrayContains,
  asc,
  count,
  desc,
  eq,
  exists,
  ilike,
  inArray,
  like,
  ne,
  or,
  sql,
} from "drizzle-orm";
import { db } from "../database/connect.js";
import {
  conversation,
  conversationParticipants,
  message,
  messageStatus,
  user,
} from "../database/schema.js";
import { Message } from "../modals/message.modal.js";
import { User } from "../modals/user.modal.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/customError.js";
import bcryptjs from "bcryptjs";
import { uid } from "uid";
import { userToSocket } from "../utils/connectWs.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

async function register(req, res) {
  const { name, email, password } = req.body;

  const isAnyEmpty = [name, email, password].some(
    (field) => field?.trim() === ""
  );

  if (isAnyEmpty) {
    res.status(301).json({ msg: "all field should be filled" });
  }
  const existedUser = await db.select().from(user).where(eq(user.email, email));

  if (existedUser.length > 0) {
    throw new ApiError(409, "User with email or username already exists");
  }

  await db
    .insert(user)
    .values({ name: name, email: email, password: password });

  const createdUser = await db
    .select({ email: user.email, name: user.name, id: user.id })
    .from(user)
    .where(eq(user.email, email));

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "User registered Successfully", createdUser));
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email) {
    throw new ApiError(400, "username or email is required");
  }

  const userInfo = await db.select().from(user).where(eq(user.email, email));

  if (user.length === 0) {
    throw new ApiError(404, "User does not exist");
  }

  console.log(userInfo);

  if (userInfo[0].password !== password) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const loggedInUser = await db
    .select({ email: user.email, name: user.name, id: user.id })
    .from(user)
    .where(eq(user.email, email));

  return res.status(200).json(
    new ApiResponse(200, "User logged In Successfully", {
      user: loggedInUser,
    })
  );
};

const findUsers = async (req, res) => {
  const { name, id } = req.params;
  console.log(id);
  let users = await db
    .select()
    .from(user)
    .where(and(ne(user.id, id), ilike(user.name, `%${name}%`)));
  if (!users) {
    throw new ApiError(401, "cannot find users");
  }
  return res.status(200).json(new ApiResponse(200, "all users", users));
};

const getMessages = async (req, res) => {
  const { recieverId, senderId } = req.params;
  console.log("get messages", senderId, recieverId);

  try {
    let messages = await db
      .select()
      .from(message)
      .where(
        or(
          and(
            eq(message.senderId, senderId),
            eq(message.receiverId, recieverId)
          ),
          and(
            eq(message.senderId, recieverId),
            eq(message.receiverId, senderId)
          )
        )
      )
      .orderBy(desc(message.createdAt));
    if (message.length <= 0) {
      throw new ApiError(401, "cannot find messages");
    }
    return res.status(200).json(new ApiResponse(200, "messages", messages));
  } catch (error) {
    console.log("cant get the messages", error);
  }
};

const getChats = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const chatIds = await db
      .select({ conversationId: conversationParticipants.conversationId })
      .from(conversationParticipants)
      .where(eq(conversationParticipants.userId, id));

    const converstionIdsArr = chatIds.map((ids) => ids.conversationId);
    let sq = db
      .select({ unseenMsg: count().as('unseenMsg'), conversationId: message.conversationId })
      .from(message)
      .innerJoin(
        messageStatus,
        eq(message.id, messageStatus.messageId),
        eq(messageStatus.status, "unseen")
      )
      .where(
        and(
          inArray(message.conversationId, converstionIdsArr),
          and(eq(messageStatus.userId, id))
        )
      )
      .groupBy(message.conversationId)
      .as("sq");

    let chatInfo = await db
      .select({
        userId: user.id,
        name: user.name,
        email: user.email,
        conversationId: conversation.id,
        lastMessage: message.content,
        unseenMessages: sq.unseenMsg,
        lastMessageSender: message.senderId
      })
      .from(conversationParticipants)
      .innerJoin(
        conversation,
        eq(conversation.id, conversationParticipants.conversationId)
      )
      .innerJoin(user, eq(conversationParticipants.userId, user.id))
      .innerJoin(message, eq(conversation.lastMessage, message.id))
      .leftJoin(
        sq,
        eq(conversationParticipants.conversationId, sq.conversationId)
      )
      .where(
        and(
          inArray(conversationParticipants.conversationId, converstionIdsArr),
          ne(user.id, id)
        )
      );

    return res.status(200).json(new ApiResponse(200, "success", chatInfo));
  } catch (error) {
    console.log(error);
  }
};

const checkStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const socket = userToSocket.get(Number(id));

    if (socket) {
      console.log("User is online:", id);
      return res
        .status(200)
        .json(new ApiResponse(200, "online", { status: "online" }));
    } else {
      console.log("User is offline:", id);
      return res
        .status(200)
        .json(new ApiResponse(200, "offline", { status: "offline" }));
    }

    // Do something with usersPerConversation if needed
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "can not get status", error);
  }
};

const updateMsgStatus = async (req, res) => {
  const { id, msgId } = req.params;
  await db
    .update(messageStatus)
    .set({ status: "seen" })
    .where(
      and(eq(messageStatus.userId, id), eq(messageStatus.messageId, msgId))
    );

  return res.status(200).json(new ApiResponse(200, "all users", users));
};
export {
  register,
  loginUser,
  findUsers,
  getChats,
  getMessages,
  checkStatus,
  updateMsgStatus,
};
