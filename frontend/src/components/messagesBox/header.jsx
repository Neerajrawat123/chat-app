import { FaSearch } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { useContext } from "react";
import { friendContext } from "../../context/friend";

export default function Header() {
  const { friend } = useContext(friendContext);
  return (
    <div className="h-16 bg-blue-500 w-2/3 flex justify-between px-6 items-center fixed ">
      <div className="flex gap-2 items-center">
        <img src="images/account.svg" className="h-12 bg-inherit"/>
        <div className="flex flex-col">
          <span className="text-2xl">{friend.name}</span>
          <span>online</span>
        </div>
      </div>
      <div className="flex w-1/5 justify-between text-2xl">
        <FaSearch />
        <CiMenuKebab />
      </div>
    </div>
  );
}
