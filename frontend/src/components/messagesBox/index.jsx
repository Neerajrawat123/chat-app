import Header from "./header";
import InputBox from "./InputBox";
import Messages from "./Messages";

export default function MessageBox() {

  return (
    <div className="w-2/3 flex flex-col h-screen relative overflow-hidden">
      <Header />
     
      {/* { friend ? ( */}
        <>
      <Messages />
      <InputBox />
      </>


      
    

  </div>
)}
