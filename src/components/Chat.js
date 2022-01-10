import React, { useState } from "react";
import profilepic from "../assets/profile.png";
import elipsisicon from "../assets/elipsis.png";
import addicon from "../assets/add.png";
import sendicon from "../assets/send-arrow.png";
const Chat = () => {
  const [data, setdata] = useState(["a"]);
  const renderChat = () => {
    if (data) {
      return <p>blala</p>;
    } else {
      return "";
    }
  };
  return (
    <>
      <div className="flex w-full items-center border-gray-300 border-b-[1px] pb-2">
        <button className="mr-3">
          <img src={profilepic} alt="" />
        </button>
        <p className="text-sm mr-auto">Bambang</p>
        <button>
          <img src={elipsisicon} alt="" />
        </button>
      </div>
      <div className="flex flex-col overflow-y-auto scrollbar-style w-full pt-3 my-auto">
        <div className="flex pb-2 items-start mb-4">
          <img src={profilepic} alt="" className="mr-2" />
          <div className="bg-slate-50 max-w-[calc(100%_-_90px)] rounded-xl rounded-tl-none shadow-[5px_5px_5px_rgba(0,0,0,0.10)] py-1 px-3 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            consequuntur, reprehenderit quisquam commodi nobis vitae quo sit
            facere! Unde perspiciatis at exercitationem provident sunt cumque
            doloremque, corporis similique culpa eaque.
          </div>
        </div>
        <div className="flex flex-row-reverse pb-2 items-start mb-4 mr-1">
          <img src={profilepic} alt="" className="ml-2" />
          <div className="bg-[#ABEDD8] max-w-[calc(100%_-_90px)] rounded-xl rounded-tr-none shadow-[-5px_5px_5px_rgba(0,0,0,0.10)] py-1 px-3 text-sm">
            asflaskfja
          </div>
        </div>
        <div className="flex pb-2 items-start mb-4">
          <img src={profilepic} alt="" className="mr-2" />
          <div className="bg-slate-50 max-w-[calc(100%_-_90px)] rounded-xl rounded-tl-none shadow-[5px_5px_5px_rgba(0,0,0,0.10)] py-1 px-3 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            consequuntur, reprehenderit quisquam commodi nobis vitae quo sit
            facere! Unde perspiciatis at exercitationem provident sunt cumque
            doloremque, corporis similique culpa eaque.
          </div>
        </div>
        <div className="flex pb-2 items-start mb-4">
          <img src={profilepic} alt="" className="mr-2" />
          <div className="bg-slate-50 max-w-[calc(100%_-_90px)] rounded-xl rounded-tl-none shadow-[5px_5px_5px_rgba(0,0,0,0.10)] py-1 px-3 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            consequuntur, reprehenderit quisquam commodi nobis vitae quo sit
            facere! Unde perspiciatis at exercitationem provident sunt cumque
            doloremque, corporis similique culpa eaque.
          </div>
        </div>
      </div>
      <div className="flex w-full h-11 bg-slate-50 rounded-2xl items-center px-2">
        <button className="mr-2">
          <img src={addicon} alt="" />
        </button>
        <input
          type="text"
          className="bg-transparent outline-none text-sm placeholder:text-gray-300 placeholder:text-sm mr-auto w-full"
          placeholder="Type message here..."
        />
        <button className="hover:scale-105">
          <img
            src={sendicon}
            alt=""
            className="transition-all duration-100 hover:scale-105"
          />
        </button>
      </div>
    </>
  );
};

export default Chat;
