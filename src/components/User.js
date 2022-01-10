import React from "react";
import profilepic from "../assets/profile-90px.png";
import expandicon from "../assets/expand-arrow.png";

const User = () => {
  return (
    <>
      <button className="my-5">
        <img src={profilepic} alt="" />
      </button>
      <p className="text-lg font-semibold mb-1">Bintang</p>
      <p className="text-xs text-gray-400 mb-auto">Yo, Wassup bro</p>
      <div className="flex rounded-2xl items-center w-full mb-2 bg-[#e8e7fc] p-2">
        <div className="rounded-full h-8 w-8 bg-blue-500 mr-3"></div>
        <p className="text-sm mr-auto font-semibold">Notes</p>
        <button>
          <img src={expandicon} alt="" />
        </button>
      </div>
      <div className="flex rounded-2xl items-center w-full mb-2 bg-[#e8e7fc] py-1 px-2">
        <div className="rounded-full h-8 w-8 bg-blue-500 mr-3"></div>
        <p className="text-sm mr-auto font-semibold">Media</p>
        <button>
          <img src={expandicon} alt="" />
        </button>
      </div>
    </>
  );
};

export default User;
