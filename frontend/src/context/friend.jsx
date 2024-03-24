import {  createContext, useState } from "react";

export const friendContext = createContext(null);

const FriendContext = ({ children }) => {
  const [friend, setFriend] = useState("");

  return (
    <friendContext.Provider value={{ friend, setFriend }}>
      {children}
    </friendContext.Provider>
  );
};
export default FriendContext;
