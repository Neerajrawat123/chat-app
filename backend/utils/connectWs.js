import { and, count, eq, exists, Table } from "drizzle-orm";
import { app } from "../app.js";
import { db } from "../database/connect.js";
import {
  conversation,
  conversationParticipants,
  message,
  messageStatus,
  user,
} from "../database/schema.js";
import { httpServer } from "../index.js";
import { Server } from "socket.io";

export let userToSocket = new Map();
export let socketToUser = new Map();
export function connectWs() {
  try {
    const io = new Server(httpServer, {
      cors: { origin: "*" },
    });

    io.on("connection", async (socket) => {
      console.log("ws connection successfully", socket.id);

      socket.on("storeId", (id) => {
        console.log("socket id", id);
        userToSocket.set(id, socket.id);
        socketToUser.set(socket.id, id);
      });

      socket.on("start conversation", async (data, callback) => {
        const { recieverId, senderId, content } = data;
        console.log(recieverId, senderId, content);

        try {
          // start the conversation

          const newConversation = await db
            .insert(conversation)
            .values({})
            .returning();

          const conversationId = newConversation[0].id;

          // 2. Add participants to the conversation
          const participants = [
            {
              userId: senderId,
              conversationId,
            },
            {
              userId: recieverId,
              conversationId,
            },
          ];

          // add participants in conversation

          await db.insert(conversationParticipants).values(participants);

          const msg = await db
            .insert(message)
            .values({
              conversationId: conversationId,
              senderId,
              receiverId: recieverId,
              content: "hii",
            })
            .returning();

          // add message "hi" in message Table

          const msgId = msg[0].id;

          await db.insert(messageStatus).values({
            messageId: msgId,
            userId: recieverId,
          }).returning();

          // fill message status table

          await db
            .update(conversation)
            .set({ lastMessage: msgId })
            .where(eq(conversation.id, conversationId));

          const recieverData = await db
            .select({
              userId: user.id,
              name: user.name,
              email: user.email,
              msgId: message.id,
              conversationId: message.conversationId,
              lastMessage: message.content,
            })
            .from(message)
            .innerJoin(user, eq(message.receiverId, user.id))
            .innerJoin(
              conversation,
              eq(message.conversationId, conversation.id)
            )
            .where(eq(message.id, msgId));

          // get reciever info

          const senderData = await db
            .select({
              userId: user.id,
              name: user.name,
              email: user.email,
              msgId: message.id,
              conversationId: message.conversationId,
              lastMessage: message.content,
            })
            .from(message)
            .innerJoin(user, eq(message.senderId, user.id))
            .innerJoin(
              conversation,
              eq(message.conversationId, conversation.id)
            )
            .where(eq(message.id, msgId));

          // get sender info

          const unseenMessages = await db
            .select({ value: count() })
            .from(messageStatus)
            .where(
              and(
                eq(messageStatus.userId, user.userId),
                eq(messageStatus.status, "unseen")
              )
            );

          // get count of unseen msgs

          callback({
            status: 200,
            user: { ...recieverData, unseenMessages: 0 },
            msg: msg[0],
          });

          // send this data to user

          io.to(userToSocket.get(recieverId)).emit("receive message", {
            msginfo: msg[0],
            user: { ...senderData, unseenMessages: unseenMessages[0].value },
          });

          // send this data to reciever
        } catch (error) {
          console.log(error);
        }
      });

      socket.on("typing", (data) => {
        console.log("typing", data);
        socket.broadcast.emit("typing-data", data);
      });
      socket.on("send message", async (data) => {
        const { recieverId, senderId, content } = data;

        const conversationId = await db
          .select({ conversationId: conversationParticipants.conversationId })
          .from(conversationParticipants)
          .where(
            and(
              eq(conversationParticipants.userId, senderId),
              exists(
                db
                  .select()
                  .from(conversationParticipants)
                  .where(
                    and(
                      eq(conversationParticipants.userId, recieverId),
                      eq(
                        conversationParticipants.conversationId,
                        conversationParticipants.conversationId
                      )
                    )
                  )
              )
            )
          )
          .limit(1);

        const createdMessage = await db
          .insert(message)
          .values({
            conversationId: conversationId[0].conversationId,
            senderId: senderId,
            receiverId: recieverId,
            content: content,
          })
          .returning();

          
          const msgId = createdMessage[0].id;

          await db.insert(messageStatus).values({
            messageId: msgId,
            userId: recieverId,
          });


          

        await db
          .update(conversation)
          .set({ lastMessage: msgId })

          .where(eq(conversation.id, conversationId[0].conversationId));

          console.log(createdMessage)

        io.to(userToSocket.get(senderId)).emit(
          "message-delivered",
          createdMessage
        );
        io.to(userToSocket.get(recieverId)).emit(
          "message-received",
          createdMessage
        );
      });

      socket.on("disconnect", (reason) => {
        const userId = socketToUser.get(socket.id);
        userToSocket.delete(userId);
        socketToUser.delete(socket.id);

        console.log("reason", reason);
      });
    });
  } catch (error) {
    console.log(error);
  }
}
