import { useUserStore } from "../../store/userStore";


const Message = ({ content, writer }) => {
  const {currentUser} = useUserStore()
  return (
    <div
    className={`w-2/3  float-right ${writer === currentUser.id ? 'self-end' : "self-start"} float-right `}
      
      
    >
      <div className={` px-4 py-3 max-w-max text-xl ${writer=== currentUser.id ? 'float-right bg-[#ef6144] text-white' : "float-left bg-[#f6f6f6]"}  text-lg  rounded-xl `} >
        {content}
      
      </div>
      {/* <span>{unreadMsgs.length}</span> */}
    </div>
  );
};
export default Message;

