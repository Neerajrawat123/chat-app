import mongoose, {  Schema} from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reciever: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    readBy: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
  },
  {
    timestamps: true,
  },
)

export const Message = mongoose.model("messages", messageSchema);
