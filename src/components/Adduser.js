import React, { useState } from "react";
import searchicon from "../assets/search.png";

const Adduser = () => {
  const [searchBy, setsearchBy] = useState("name");
  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log(searchBy);
        }}
      >
        <div className="flex bg-[#e8e7fc] rounded-md items-center w-[15rem]">
          <img src={searchicon} alt="" className="h-5 mx-2" />
          <input
            type={searchBy === "email" ? "email" : "text"}
            className="bg-transparent placeholder:text-sm placeholder:italic outline-none h-8 w-full text-sm"
            placeholder="Search User"
          />
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex items-center mr-5">
            <input
              type="radio"
              name="by"
              id="name"
              className="mr-1"
              value={"name"}
              onClick={e => {
                setsearchBy(e.target.value);
              }}
              defaultChecked
            />
            <label htmlFor="byname" className="text-xs">
              by Name
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="by"
              id="email"
              onClick={e => {
                setsearchBy(e.target.value);
              }}
              value={"email"}
            />
            <label htmlFor="email" className="ml-1 text-xs">
              by Email
            </label>
          </div>
        </div>
      </form>
    </>
  );
};

export default Adduser;
