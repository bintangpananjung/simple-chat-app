import React, { useState, useEffect } from "react";
import searchicon from "../assets/search.png";
import profileicon from "../assets/profile.png";
import elipsisicon from "../assets/elipsis.png";
import addchaticon from "../assets/addchat.png";
import { db } from "../firebaseConfig";

const Chats = ({ userdata }) => {
  const [senderChats, setsenderChats] = useState();
  const [receiverChats, setreceiverChats] = useState();
  useEffect(() => {
    if (userdata) {
      db.collection("message")
        .where("sender", "==", userdata.uid)
        .orderBy("timestamp", "desc")
        .get()
        .then(res => {
          if (res) {
            setsenderChats(res);
          }
        })
        .catch(err => {
          console.log(err.code, err.message);
        });
    }
  }, []);
  useEffect(() => {
    db.collection("message")
      .where("receiver", "==", userdata.uid)
      .orderBy("timestamp", "desc")
      .get()
      .then(res => {
        if (res) {
          setreceiverChats(res);
        }
      })
      .catch(err => {
        console.log(err.code, err.message);
      });
  }, []);
  const renderChats = () => {};
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
        <div className="flex items-center border-y-[1px] px-4 py-1 cursor-pointer hover:bg-[#e8e7fc]">
          <img src={profileicon} alt="" className="h-[36px]" />
          <div className="flex flex-col mr-auto">
            <p className="ml-4 text-sm mb-1">Bintang</p>
            <p className="text-xs text-slate-500 ml-4">Yo, Wassup bro</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[11px] text-gray-400">19/7/2021</p>
            <button>
              <img src={elipsisicon} alt="" />
            </button>
          </div>
        </div>
        <div className="flex items-center border-y-[1px] px-4 py-1 cursor-pointer hover:bg-[#e8e7fc]">
          <img src={profileicon} alt="" className="h-[36px]" />
          <div className="flex flex-col mr-auto">
            <p className="ml-4 text-sm mb-1">Bambang</p>
            <p className="text-xs text-slate-500 ml-4">Yo, apa bro</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[11px] text-gray-400">19/7/2021</p>
            <button>
              <img src={elipsisicon} alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
