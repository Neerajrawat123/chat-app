import { useEffect } from "react";
import MessageBox from "../components/messagesBox/index.jsx";
import Sidebar from "../components/sidebar";
import { ImArrowLeft } from "react-icons/im";
import { useUserStore } from "../store/userStore.js";
import { useChatStore } from "../store/chatStore.js";
import {connectSocket} from '../lib/connectSocket.js'
import { socket } from "../lib/socket.js";






export default function Dashboard() {
  
  const user = useUserStore((state) => state.currentUser)
  const { chatId,  } = useChatStore()
  if(user){

    connectSocket()
  }

 
 

  
  

 

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.emit("storeId", user.id);
  }, []);

 

 
  return (
      <div className="w-full h-screen  bg-black  px-24 py-4 overflow-hidden">
        
        <div className="flex w-full bg-white">

        <Sidebar />
        { chatId ? (

          <MessageBox />
        ):
        (
          <div className="w-full h-screen ">
            <div className="flex h-full justify-center items-center gap-6">
            <ImArrowLeft size={60} color="rgb(249 115 22)"/>
              <h2 className="bg-orange-500 text-white px-8 py-4 rounded-lg text-3xl font-bold">

            Click user to see chat
              </h2>

            </div>
          </div>
        )
        }
        </div>
      </div>
  );
}
