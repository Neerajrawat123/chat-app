import { useState, useEffect, useContext } from "react";
import MessageBox from "../components/messagesBox/index.jsx";
import Sidebar from "../components/sidebar";
import { io } from "socket.io-client";
import FriendContext, { friendContext } from "../context/friend.jsx";
import { userContext } from "../context/userContext.jsx";
import axios from "axios";
export const socket = io("http://localhost:4000");

export default function Dashboard() {
  const { user } = useContext(userContext);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.emit("storeId", user._id);
  }, []);

  useEffect(() => {
    axios(`/user/getUsers/${user._id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((usedata) => {
        setUsers(usedata.data);
      });
  }, []);

  useEffect(() => {
    axios(`/user/messages/${user._id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((usedata) => {
        setMessages(usedata.data);
      });
  }, []);

  useEffect(() => {
    socket.on("receive message", (data) => {
      console.log(data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive message");
    };
  }, []);

  return (
    <FriendContext>
      <div className="flex w-full h-screen ">
        <Sidebar users={users} messages={messages} />
        <MessageBox messages={messages} />
      </div>
    </FriendContext>
  );
}
