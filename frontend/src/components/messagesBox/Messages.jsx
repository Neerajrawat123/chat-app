import { useContext } from "react";
import Message from "./Message";
import { friendContext } from "../../context/friend";
import { userContext } from "../../context/userContext";

const Messages = ({ messages }) => {
  const { user } = useContext(userContext);
  const { friend } = useContext(friendContext);
  const msgs = messages.filter(
    (msg) => msg.reciever === friend._id || msg.sender === friend._id,
  );
  const unreadMsgs = msgs.filter(
    (message) => !messages?.readBy?.includes(user._id),
  );
  return (
    <div className="overflow-scroll mb-12 mt-16">
      <div className="px-8 py-2 flex flex-col ">
        {msgs.length === 0 && <div>click to send messages </div>}
        {msgs.map((msg) => (
          <Message content={msg.content} writer={msg.sender} />
        ))}
      </div>
    </div>
  );
};
export default Messages;
