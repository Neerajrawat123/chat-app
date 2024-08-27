import {  useRef, useState } from "react";
import {  FaSearch } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { debounce } from 'lodash';
import axios from "axios";
import { useUserStore } from "../../store/userStore";
import { useChatStore } from "../../store/chatStore";
import { socket } from "../../lib/socket";

export default function Search() {
  const inputRef = useRef(null);
  const { currentUser } = useUserStore()
  const {  addChatUsers } = useChatStore()
  const [suggestion, setSuggestion] = useState([])
  const [search, setSearch] = useState('')
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClick = (e, id) => {



    e.preventDefault()
    socket.emit("start conversation", {
      recieverId: id,
      senderId: currentUser.id,
      content: 'hii',
    }, (response) => {
      console.log(response)
      if(response.status === 200){
        addChatUsers(response.user[0])
        
      }
    });


    
  

  
     
      console.log("Conversation started successfully.");
      setSearch('');
      setSuggestion([]);
  }


 

  

  const handleSuggestion = debounce(() => {
    axios(`/user/find/user/${currentUser.id}/${search}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data
    })
    .then((usedata) => {
      setSuggestion(usedata.data);
    });  }, 500);

  const handleChange = (val) => {
    setSearch(val)
    handleSuggestion()
    
  };


  const minimize = () => {
    setIsFocused(!isFocused)
  }

  // useEffect(() => {
  //     axios(`/user/getUsers/${user._id}`)
  //       .then((response) => {
  //         if (response.status !== 200) {
  //           throw new Error("Network response was not ok");
  //         }
  //         return response.data
  //       })
  //       .then((usedata) => {
  //         console.log(usedata)
  //         setUsers(usedata.data);
  //       });
  //   }, []);
  

  return (
    <div className="relative">
      <div className="w-full border rounded-lg bg-[#f6f6f6] px-2 py-2 shadow-md">
        <div className="rounded-md flex gap-2 items-center">
          {!isFocused ? <FaSearch size={20} /> : (<button onClick={minimize}><IoMdArrowRoundBack size={20} /></button> )}
          <input
            ref={inputRef}
            onFocus={handleFocus}
            onChange={(e) => handleChange(e.target.value)}
            type="text"
            placeholder="Search"
            className="px-3 h-8 w-full focus:outline-none text-xl font-semibold rounded bg-transparent"
          />
        </div>
      </div>
      {isFocused && (
        <div className="absolute top-20 left-[-5px]  bg-white h-40  w-full z-50">

          {suggestion.length > 0 ? (
            suggestion.map((sugg) => (
              <div key={sugg.id} className="h-10 border-b-2 border-gray-200 hover:bg-gray-400 flex items-center justify-between pr-8 bg-[#f6f6f6] text-[#ef6144]">
              <span className="text-2xl px-3">{sugg.name}</span>
              <button onClick={(e) => handleClick(e,sugg.id)} className="bg-[#ef6144] text-white px-2 py-1 rounded">start conversation</button>
            </div>

            ))
          ):(
            <div className="flex justify-center items-center px-1 py-2">
              <span className="text-xl font-semibold">
              cant find the user

              </span>
              </div>
          )}
        
        
        </div>
      )}
    </div>
  );
}
