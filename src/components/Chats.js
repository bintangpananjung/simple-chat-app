import React from "react";
import searchicon from "../assets/search.png";
import profileicon from "../assets/profile.png";
import elipsisicon from "../assets/elipsis.png";
import addchaticon from "../assets/addchat.png";
// import { db } from "../firebaseConfig";

const Chats = ({ chats, usernames, usertochat }) => {
  const renderChats = () => {
    if (chats.length > 0 && usernames.length > 0) {
      return chats.map((val, index) => {
        return (
          <div
            onClick={e => {
              e.preventDefault();
              // console.log(val);
              usertochat(val.uid);
            }}
            key={val.uid}
            className="flex items-center border-y-[1px] px-4 py-1 cursor-pointer hover:bg-[#e8e7fc]"
          >
            <img src={profileicon} alt="" className="h-[36px]" />
            <div className="flex flex-col mr-auto">
              <p className="ml-4 text-sm mb-1">
                {/* {console.log(usernames)}
                {console.log(chats)} */}
                {usernames.filter(e => e.uid === val.uid)[0].username}
              </p>
              <p className="text-xs text-slate-500 ml-4">{val.message}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-[11px] text-gray-400">
                {new Date(val.timestamp * 1000)
                  .toLocaleTimeString(["ban", "id"])
                  .slice(0, 5)}
              </p>
              <button>
                <img src={elipsisicon} alt="" />
              </button>
            </div>
          </div>
        );
      });
    } else {
      return <p className="text-sm text-center">loading...</p>;
    }
  };
  // console.log(chats);
  return (
    <>
      <div className="flex bg-[#e8e7fc] rounded-md items-center w-[15rem]">
        <img src={searchicon} alt="" className="h-5 mx-2" />
        <input
          type="text"
          className="bg-transparent placeholder:text-sm placeholder:italic outline-none h-8 w-full text-sm"
          placeholder="Search Chat"
        />
      </div>
      <div className="flex justify-center items-center absolute bottom-0 right-0 m-4 bg-[#e8e7fc] shadow-md rounded-full p-3 hover:scale-105">
        <button title="Create Chat">
          <img src={addchaticon} alt="" className="h-8" />
        </button>
      </div>

      <div className="overflow-y-auto scrollbar-style w-full h-full mt-5">
        {renderChats()}
      </div>
    </>
  );
};

export default Chats;
