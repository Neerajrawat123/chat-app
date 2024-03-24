import { useContext } from "react";
import { friendContext } from "../../context/friend";

export default function Friends({ data, messages }) {
  const { friend, setFriend } = useContext(friendContext);

  const msgs = messages.filter(
    (msg) => msg.reciever === data._id || msg.sender === data._id,
  );
  const lastMessage = msgs.length > 0 ? msgs[msgs?.length - 1].content : "";

  const unreadMsgs = msgs.filter(
    (message) => !messages?.readBy?.includes(user._id),
  );
  return (
    <button onClick={() => setFriend(data)} className="w-full">
      <div
        className="flex gap-2 h-16 px-1 w-full items-center hover:bg-blue-600"
        style={{ backgroundColor: friend?.name === data?.name ? "blue" : "" }}
      >
        <div className="w-12 h-12 rounded-[50%] overflow-clip">
          <img src="images/friend.jpg" className="w-16" />
        </div>
        <div className="flex flex-col border-b-2 border-blue-500 flex-1 items-start">
          <div>
            <span className="text-2xl font-bold">{data?.name}</span>
          </div>
          <div className="flex justify-between w-full pr-4">
            <span
              className={unreadMsgs.length > 0 ? "text-green-500 " : "text-lg"}
            >
              {lastMessage}
            </span>
            <span className=" w-6 h-6 rounded-[50%] text-green-500 flex items-center justify-center bg-green-500">
              {unreadMsgs.length}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
