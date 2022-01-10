import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import searchicon from "../assets/search.png";
import profileicon from "../assets/profile.png";
import elipsisicon from "../assets/elipsis.png";
const Users = () => {
  const [data, setdata] = useState();
  useEffect(() => {
    db.collection("users")
      .get()
      .then(res => {
        setdata(res);
      });
  }, []);
  const renderUser = () => {
    if (data) {
      var userslist = [];
      data.forEach(val => {
        var x;
        if (val.data().username === "bintang") {
          userslist.unshift(
            <div key={val.id}>
              <p className="text-xs text-slate-500 ml-4 my-2">You</p>
              <div className="flex items-center border-y-[1px] px-4 py-1 cursor-default hover:bg-[#e8e7fc]">
                <img src={profileicon} alt="" className="h-[36px]" />
                <p className="ml-4 text-sm mr-auto">{val.data().username}</p>
                <p className="text-xs text-slate-500 ml-4 my-2 mr-3">
                  {val.data().status}
                </p>
                <button>
                  <img src={elipsisicon} alt="" />
                </button>
              </div>
              <p className="text-xs text-slate-500 ml-4 my-2">Friends</p>
            </div>
          );
        } else {
          x = (
            <div
              key={val.id}
              className="flex items-center border-y-[1px] px-4 py-1 cursor-pointer hover:bg-[#e8e7fc]"
            >
              <img src={profileicon} alt="" className="h-[36px]" />
              <p className="ml-4 text-sm mr-auto">{val.data().username}</p>
              <p className="text-xs text-slate-500 ml-4 my-2 mr-3">
                {val.data().status}
              </p>
              <button>
                <img src={elipsisicon} alt="" />
              </button>
            </div>
          );
        }

        userslist.push(x);
      });
      return userslist;
    }
  };
  return (
    <>
      <div className="flex bg-[#e8e7fc] rounded-md items-center w-[15rem]">
        <img src={searchicon} alt="" className="h-5 mx-2" />
        <input
          type="text"
          className="bg-transparent placeholder:text-sm placeholder:italic outline-none h-8 w-full text-sm"
          placeholder="Search User"
        />
      </div>
      <div className="overflow-y-auto scrollbar-style w-full mt-4">
        {renderUser()}
        {/* <p className="text-xs text-slate-500 ml-4 my-2">You</p>
        <div className="flex items-center border-y-[1px] px-4 py-1 cursor-default hover:bg-[#e8e7fc]">
          <img src={profileicon} alt="" className="h-[36px]" />
          <p className="ml-4 text-sm mr-auto">Bintang</p>
          <p className="text-xs text-slate-500 ml-4 my-2 mr-3">
            Yo, Wassup bro
          </p>
          <button>
            <img src={elipsisicon} alt="" />
          </button>
        </div>
        <p className="text-xs text-slate-500 ml-4 my-2">Friends</p>
        <div className="flex items-center border-y-[1px] px-4 py-1 cursor-pointer hover:bg-[#e8e7fc]">
          <img src={profileicon} alt="" className="h-[36px]" />
          <p className="ml-4 text-sm mr-auto">Bambang</p>
          <p className="text-xs text-slate-500 ml-4 my-2 mr-3">yoyoo</p>
          <button>
            <img src={elipsisicon} alt="" />
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Users;
