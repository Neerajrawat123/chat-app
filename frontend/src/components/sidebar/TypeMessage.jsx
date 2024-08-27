
function TypeMessage() {
  return (
    <div className=" px-3 py-4 border-t-[1px]  border-gray-100 bg-[#f6f6f6] flex gap-4">
        <div className="bg-[#ef6144] text-white px-3 rounded-xl">
            <button>All</button>
        </div>
        <div className="border font-medium border-gray-300   text-gray-500 px-3 rounded-xl">
            <button>unread</button>
        </div>
        <div className="border font-medium border-gray-300 text-gray-500  px-3 rounded-xl">
            <button>Archieved</button>
        </div>
        <div className="border font-medium border-gray-300  text-gray-500   px-3 rounded-xl">
            <button>Block</button>
        </div>
    </div>
  )
}

export default TypeMessage