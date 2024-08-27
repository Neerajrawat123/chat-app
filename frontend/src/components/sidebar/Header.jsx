import Search from "./Search";
import TypeMessage from "./TypeMessage";

export default function Header() {
  return (
    <div className="flex h-20 flex-col sticky top-0 rounded-lg z-50    gap-2 ">
      <div className="px-4 py-2">
        <Search />
      </div>
      <TypeMessage />
    </div>
  );
}
