import { useContext } from "react";
import { userContext } from "../../context/userContext";

export default function Header() {
  const {user} = useContext(userContext)
  return (
    <div className="h-16 w-1/3 flex fixed bg-secodary px-3 gap-2">
      <div className="w-1/3 h-full flex items-center">
        <img src="images/account.svg" className="object-contain h-3/4 bg-inherit" />
      </div>
      <div>
        <span className="text-2xl ">{user.name}</span>
      </div>
    </div>
  );
}
