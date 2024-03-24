import { useRef, useState } from "react";
import { FaAsterisk, FaSearch } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Search() {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className="py-2 px-3 mt-16 w-full">
      <div className="rounded-md flex gap-2 items-center ">
        {!isFocused ? <FaSearch /> : <IoMdArrowRoundBack />}
        <input
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="text"
          placeholder="search a chat"
          className=" px-3 h-8 w-full rounded"
        />
      </div>
    </div>
  );
}
