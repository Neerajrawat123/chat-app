import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/chatStore";
import axios from "axios";
import TypingAnimation from "../TypingAnimation";
import { useUserStore } from "../../store/userStore";
import { socket } from "../../lib/socket";

const Messages = () => {
  const lastDivRef = useRef(null);
  const { chatId, chatUsers, addChatUsers, updateLastMessage } = useChatStore();
  const { currentUser } = useUserStore();
  const [messages, setMessages] = useState([]);

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const typingHandler = (data) => {
      console.log('typing-data', data)
      if (chatId === data.id && data.typing === true) {
        setIsTyping(true);
      }else{
       setIsTyping(false)
      }

    }
    socket.on("typing-data", typingHandler);

    return () => {
      socket.off("typing-data", typingHandler);
    };
  }, [  chatId, ]);

  useEffect(() => {
    const messageReceivedHandler = (msg) => {
      console.log("msg recieved");
      setMessages((prevMessages) => [msg[0], ...prevMessages]);
      const idx = chatUsers?.findIndex(
        (item) => item.conversationId === msg[0].conversationId
      );

      if (idx === -1) {
        addChatUsers(msg[0].conversationId);
      } else {
        updateLastMessage(msg[0].senderId, msg[0]);
      }
    };

    // console.log('idx', idx)

    socket.on("message-received", messageReceivedHandler);

    return () => {
      socket.off("message-received", messageReceivedHandler);
    };
  }, [socket]);


  useEffect(() => {
    const messageDeliverHandler = (msg) => {
      console.log("msg delivered");
      setMessages((prevMessages) => [msg[0], ...prevMessages]);
      const idx = chatUsers?.findIndex(
        (item) => item.conversationId === msg[0].conversationId
      );

      if (idx === -1) {
        addChatUsers(msg[0].conversationId);
      } else {
        updateLastMessage(msg[0].receiverId, msg[0]);
      }
    };

    // console.log('idx', idx)

    socket.on("message-delivered", messageDeliverHandler);

    return () => {
      socket.off("message-delivered", messageDeliverHandler);
    };
  }, [socket]);

  useEffect(() => {
    lastDivRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatId]);

  useEffect(() => {
    async function getData(chatId) {
      const res = await axios.get(
        `user/getMessages/${chatId}/${currentUser.id}`
      );
      setMessages(res.data.data);
    }

    if (chatId) {
      getData(chatId);
    }
  }, [chatId, currentUser.id]);

  useEffect(() => {
    console.log("Updated messages:", messages);
  }, [messages]);

  return (
    <div className="scroll-smooth overflow-scroll overflow-x-hidden  mb-20  mt-24">
      <div className="px-8 py-2 flex flex-col-reverse gap-2 min-h-[80vh] items-baseline ">
        <div ref={lastDivRef}></div>
      {
          isTyping && <TypingAnimation />
        }
        {messages.map((message) => (
          <Message
            key={message.date}
            content={message.content}
            writer={message.senderId}
          />
        ))}
        

      </div>
    </div>
  );
};
export default Messages;
