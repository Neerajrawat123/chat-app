import axios from "axios";
import { useChatStore } from "../../store/chatStore";
import { useUserStore } from "../../store/userStore";
import { useState } from "react";

export default function Friends({data}) {
  const {chatId, changeChat, setConId, conId} = useChatStore()
const {userId, name, email,lastMessage, unseenMessages , conversationId} = data;
const { currentUser} = useUserStore()
const [unseenMsgs, setUnseenMsgs] = useState(unseenMessages)


const handleClick = () => {
  changeChat(userId, name)
    setConId(conversationId)

  
  
  axios.get(`/user/getMessages/${chatId}/${currentUser.id}`)
  .then((response) => {
    if(response.data.statusCode === 200){
      setUnseenMsgs(0)
    
     


    }
  })
}


  
  return (
    <button onClick={handleClick}  className="w-full ">
      <div
        className="flex gap-4 h-16 px-5 py-12 border border-gray-100  w-full items-center hover:bg-[#f6f6f6]"
        
      >
        <div className="w-14 h-14 rounded-[50%] overflow-clip">
          <img src="images/friend.jpg" className="w-16" />
        </div>
        <div className="flex flex-col  flex-1  items-start">
          <div>
            <span className="text-lg font-medium">{name}</span>
          </div>
          <div className="flex text-xl justify-between  w-full pr-4">
            <div className="">
            <span
            className="text-gray-500"
              
            >
              {unseenMessages > 0 ? name: currentUser.name}

              
            </span>
            <span>: </span>
            <span className=" text-xl font-normal ">
              {"   "}
                {lastMessage}
            </span>

            </div>
            {
              unseenMessages>0 && (
                <div className="bg-green-600 h-7 w-7  text-white  rounded-[50%]">
                  <span>{unseenMessages}</span>
                </div>
              )
            }
           
          </div>

        </div>
      </div>
    </button>
  );
}
