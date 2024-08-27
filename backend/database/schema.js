import { serial, text, timestamp, pgTable, integer, varchar, primaryKey, pgEnum } from "drizzle-orm/pg-core";

// Users table

export const typeEnum = pgEnum('type', ['text', 'image', 'video']); 
export const user = pgTable("users", {
    id: serial("id").primaryKey(),  // Primary key
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),

    createdAt: timestamp("created_at").defaultNow(),  // Automatically set timestamp
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),  // Auto-update on record update
});

// Conversations table
export const conversation = pgTable("conversations", {
    id: serial("id"), 
    lastMessage: text("lastmessage"),
    createdAt: timestamp("created_at").defaultNow(),  // Automatically set timestamp
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),  // Auto-update on record update
});

// Messages table
export const message = pgTable("messages", {
    id: serial("id").primaryKey(),  // Primary key
    conversationId: integer("conversation_id").references(() => conversation.id),  // Foreign key reference
    senderId: integer("sender_id").references(() => user.id),  // Foreign key reference
    receiverId: integer("receiver_id").references(() => user.id), 
    type: typeEnum('type').default('text'),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),  // Automatically set timestamp
});

// ConversationParticipants table
export const conversationParticipants = pgTable("conversation_participants", {
    conversationId: integer("conversation_id").references(() => conversation.id),  // Foreign key reference
    userId: integer("user_id").references(() => user.id),  // Foreign key reference
    joinedAt: timestamp("joined_at").defaultNow(),  // Automatically set timestamp
}, (table) => {
    return {
      pk: primaryKey({ columns: [table.conversationId, table.userId] }),
    };
  });


  export const messageStatus = pgTable('messageStatus', {
    messageId: integer('messageId').references(() => message.id),  // Foreign key reference to Messages
    userId: integer('userId').references(() => user.id),  // Foreign key reference to Users
    status: varchar('status').default('unseen'),  // 'seen' or 'unseen'
    seenAt: timestamp('seenAt').default(null) 
});
