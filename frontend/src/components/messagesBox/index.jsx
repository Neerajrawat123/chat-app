import { useContext } from "react";
import Header from "./header";
import InputBox from "./InputBox";
import Messages from "./Messages";
import { friendContext } from "../../context/friend";

export default function MessageBox({messages}) {
  const {friend} = useContext(friendContext)

  return (
    <div className="w-2/3 flex flex-col h-screen">
      <Header />
     
      { friend ? (
        <>
      <Messages messages={messages} />
      <InputBox />
      </>


      ):
     ( <div>this is a whatsapp clone


    </div>
  )}
  </div>
)}
