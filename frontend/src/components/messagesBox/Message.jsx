import { useContext } from "react";

import { userContext } from "../../context/userContext";

const Message = ({ content, writer, unreadMsgs }) => {
  console.log(unreadMsgs);
  const { user } = useContext(userContext);
  return (
    <div
      className={
        writer === user._id
          ? "self-end bg-green-500 rounded-lg"
          : "self-start bg-blue-600 rounded-lg"
      }
    >
      <div className="w-max px-2 py-1  text-lg border">{content}</div>
      <span>{unreadMsgs.length}</span>
    </div>
  );
};
export default Message;

