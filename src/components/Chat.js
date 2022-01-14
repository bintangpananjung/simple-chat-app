import React, { useState, useEffect } from "react";
import profilepic from "../assets/profile.png";
import elipsisicon from "../assets/elipsis.png";
import addicon from "../assets/add.png";
import sendicon from "../assets/send-arrow.png";
// import { db } from "../firebaseConfig";
const Chat = ({ usertochat, usernames }) => {
  const [data, setdata] = useState();
  // console.log(data);
  useEffect(() => {
    if (usertochat) {
      setdata(usertochat.messages);
    }
  }, [usertochat]);
  const renderChat = () => {
    if (data) {
      // console.log(data);
      return data.map(val => {
        var temp;
        if (val.send === 1) {
          temp = (
            <div
              className="flex flex-row-reverse pb-2 items-start mb-1 mr-1"
              key={val.timestamp}
            >
              <img src={profilepic} alt="" className="ml-2" />
              <div className="flex flex-col items-end w-full">
                <p className="bg-[#ABEDD8] w-fit max-w-[calc(100%_-_50px)] rounded-xl rounded-tr-none shadow-[-5px_5px_5px_rgba(0,0,0,0.10)] py-1 px-3 text-[0.75rem]">
                  {val.message}
                </p>
                <p className="text-[10px] mt-1 mr-1 text-gray-400">
                  {new Date(val.timestamp * 1000)
                    .toLocaleTimeString(["ban", "id"])
                    .slice(0, 5)}
                </p>
              </div>
            </div>
          );
        } else {
          temp = (
            <div className="flex pb-2 items-start mb-1" key={val.timestamp}>
              <img src={profilepic} alt="" className="mr-2" />
              <div className="flex flex-col items-start w-full">
                <div className="bg-slate-50 max-w-[calc(100%_-_50px)] rounded-xl rounded-tl-none shadow-[5px_5px_5px_rgba(0,0,0,0.10)] py-1 px-3 text-[0.75rem]">
                  {val.message}
                </div>
                <p className="text-[10px] mt-1 ml-1 text-gray-400">
                  {new Date(val.timestamp * 1000)
                    .toLocaleTimeString(["ban", "id"])
                    .slice(0, 5)}
                </p>
              </div>
            </div>
          );
        }
        return temp;
      });
    } else {
      return "";
    }
  };
  const renderName = () => {
    if (usertochat && usernames) {
      return (
        <>
          <button className="mr-3">
            <img src={profilepic} alt="" />
          </button>
          <p className="text-sm mr-auto">
            {usertochat && usernames
              ? usernames.filter(e => e.uid === usertochat.uid)[0].username
              : ""}
          </p>
          <button>
            <img src={elipsisicon} alt="" />
          </button>
        </>
      );
    }
    return "";
  };
  return (
    <>
      <div className="flex w-full items-center border-gray-300 border-b-[1px] pb-2">
        {renderName()}
      </div>
      <div className="flex flex-col-reverse overflow-y-auto scrollbar-style w-full pt-3 mb-auto">
        {renderChat()}
        {/* <div className="flex pb-2 items-start mb-4">
          <img src={profilepic} alt="" className="mr-2" />
          <div className="flex flex-col w-full">
            <div className="bg-slate-50 max-w-[calc(100%_-_50px)] rounded-xl rounded-tl-none shadow-[5px_5px_5px_rgba(0,0,0,0.10)] py-1 px-3 text-[0.75rem]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              consequuntur, reprehenderit quisquam commodi nobis vitae quo sit
              facere! Unde perspiciatis at exercitationem provident sunt cumque
              doloremque, corporis similique culpa eaque.
            </div>
            <p className="text-[10px] mt-1 ml-1 text-gray-400">19.07</p>
          </div>
        </div>
        <div className="flex flex-row-reverse pb-2 items-start mb-4 mr-1">
          <img src={profilepic} alt="" className="ml-2" />
          <div className="flex flex-col items-end w-full">
            <p className="bg-[#ABEDD8] max-w-[calc(100%_-_50px)] rounded-xl rounded-tr-none shadow-[-5px_5px_5px_rgba(0,0,0,0.10)] py-1 px-3 text-[0.75rem]">
              asflaskfja Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Natus ducimus placeat quod, incidunt quaerat quidem.
              Doloremque eaque illo maiores cumque ullam cum vel iusto
              accusamus, voluptate alias! Facilis, reprehenderit quia?
            </p>
            <p className="text-[10px] mt-1 mr-1 text-gray-400">19.08</p>
          </div>
        </div> */}
      </div>
      <div className="flex w-full h-11 bg-slate-50 rounded-2xl items-center px-2">
        <button className="mr-2">
          <img src={addicon} alt="" />
        </button>
        <input
          type="text"
          className="bg-transparent outline-none text-xs placeholder:text-gray-300 placeholder:text-xs mr-auto w-full"
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
