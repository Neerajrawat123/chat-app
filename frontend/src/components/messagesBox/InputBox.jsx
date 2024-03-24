import { useContext, useState } from "react";
import { GiPlayButton } from "react-icons/gi";
import { MdEmojiEmotions } from "react-icons/md";
import { socket } from "../../pages/Dashboard";
import { userContext } from "../../context/userContext";
import { friendContext } from "../../context/friend";
const InputBox = () => {
  const {user } = useContext(userContext)
  const { friend } = useContext(friendContext)
  const [message, setMessage]  = useState('')
  const sendMessage = async () => {
    if (message !== '') {
      socket.emit('send message' , {recieverId:friend._id, senderId: user._id, message: message})
      setMessage('')
      
    }



    
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
      
    }
  }

  
  return (
    <div className="h-12 w- p-2 bg-gray-200 flex text-3xl flex-1 fixed bottom-0 gap-2">
      <MdEmojiEmotions />
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown} className=" px-2 text-xl w-4/5 rounded-lg" placeholder="enter the message"/>
      <GiPlayButton onClick={sendMessage} />
    </div>
  );
};
export default InputBox;
