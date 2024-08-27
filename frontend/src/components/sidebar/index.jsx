import { useEffect, useState } from "react";
import Friends from "./Friends";
import Header from "./Header";
import { useUserStore } from "../../store/userStore";
import axios from "axios";
import { useChatStore } from "../../store/chatStore";

export default function Sidebar() {
  const currentUser = useUserStore((state) => state.currentUser)
  const { setChatUsers, chatUsers} = useChatStore()
  useEffect(() => {
    axios(`/user/chats/${currentUser.id}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      console.log('response', response)

      return response
    })
    .then((usedata) => {
      setChatUsers(usedata.data.data)
    });
   
  }, []);
  return (
    <div className="w-1/3 relative  h-screen border-gray-500 border">
      <Header />
      <div className="mt-[4.6rem]">
        {
          chatUsers.length > 0 && 
          chatUsers.map((user) => (

            <Friends key={user?.id} data={user}/>
          ))
        }




      </div>
     
    </div>
  );
}
