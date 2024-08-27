import { useEffect, useState } from "react";
import { PiPaperclip } from "react-icons/pi";
import { PiPaperPlaneRightBold } from "react-icons/pi";
import { useUserStore } from "../../store/userStore";
import { useChatStore } from "../../store/chatStore";
import { socket } from "../../lib/socket";
const InputBox = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { currentUser } = useUserStore();
  const { chatId, conId } = useChatStore();

 
  const sendMessage = async () => {
    if (message !== "") {
      socket.emit("send message", {
        recieverId: chatId,
        senderId: currentUser.id,
        content: message,
        conversationId: conId
      });
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    
  };

  useEffect(() => {
    console.log('typing change')

    if(isTyping){
      socket.emit("typing", { typing: true, id: currentUser.id });

    }else{
      socket.emit("typing", { typing: false, id: currentUser.id });

    }

    return () => {
      socket.off("typing");
    };
   
  }, [ currentUser, chatId, isTyping])

  // function handleFocus() {
  //   socket.emit("typing", { typing: true, id: currentUser.id });

    
  // }


  // function handleBlur() {
    
  // }
  

  return (
    <div className="h-12 w-full px-12 absolute  bottom-6 ">
      <div className="flex text-3xl flex-1  gap-2 bg-[#f6f6f6] rounded-lg items-center">
        <input
          type="text"
          value={message}
          onKeyDown={(e) => handleKeyDown(e)}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          onChange={(e) => handleInputChange(e)}
          className=" px-4 py-3 text-lg focus:outline-none font-medium w-[87%] bg-transparent rounded-lg"
          placeholder="Type your message here"
        />

        <div className="flex gap-7 items-center py-1 ">
          <PiPaperclip size={25} fill="#ef6144" />
          <PiPaperPlaneRightBold
            onClick={() => sendMessage()}
            size={28}
            fill="#ef6144"
            className="bg-orange-100 cursor-pointer p-1"
          />
        </div>
      </div>
    </div>
  );
};
export default InputBox;
