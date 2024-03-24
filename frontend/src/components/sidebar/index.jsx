import Friends from "./Friends";
import Header from "./Header";
import Search from "./Search";

export default function Sidebar({ users , messages}) {
  return (
    <div className="w-1/3 min-w-72 h-full border-gray-500 border">
      <Header />
      <Search />
      <div className="bg-blue-100 w-full border border-blue-200 ">
        {users.map((user) => (
          <Friends data={user} messages={messages}/>
        ))}
      </div>
    </div>
  );
}
