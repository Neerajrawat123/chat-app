import { useEffect, useState } from "react";
import { subscribe } from "../../lib/onlineIndicator";
import { useChatStore } from "../../store/chatStore";
import { useUserStore } from "../../store/userStore";
import { socket } from "../../pages/Dashboard";

export default function Header() {
  const {user, chatId, OnlineStatus} = useChatStore()
  const { currentUser} = useUserStore()

  

  useEffect(() => {
    subscribe(chatId)
  
    
  }, [chatId])
  
  return (
    <div className="h-20 bg-[#f6f6f6] w-full absolute top-6  border-b-2 px-8 border-gray-100 overflow-hidden flex justify-between  ">
      <div className="flex gap-4 items-center">
        <img src="images/account.svg" className="h-16 bg-inherit" />
        <div className="flex flex-col gap-2">
          <div>
            <span className="text-[1.2rem] font-medium">{user}</span>
            <span></span>
          </div>
          <div>
            
            <span className="text-gray-400 font-medium">{ OnlineStatus ? 'online' : 'offline'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
