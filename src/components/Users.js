import React, { useState } from "react";
// import { db } from "../firebaseConfig";
import searchicon from "../assets/search.png";
import profileicon from "../assets/profile.png";
import elipsisicon from "../assets/elipsis.png";
const Users = ({ friends, userdata, setusertoprofile, setusertochat }) => {
  const [userOptions, setuserOptions] = useState(0);

  // const [data, setdata] = useState();
  // console.log(data);
  //get user data

  const renderUser = () => {
    if (friends && userdata) {
      var userslist = [];
      userslist.push(
        <div key={userdata.uid}>
          <p className="text-xs text-slate-500 ml-4 my-2">You</p>
          <div
            className="flex items-center border-y-[1px] px-4 py-1 cursor-pointer hover:bg-[#e8e7fc]"
            onClick={e => {
              e.preventDefault();
              setusertoprofile(userdata);
            }}
          >
            <img src={profileicon} alt="" className="h-[36px]" />
            <p className="ml-4 text-sm mr-auto">{userdata.username}</p>
            <p className="text-xs text-slate-500 ml-4 my-2 mr-3 max-w-full break-words">
              {userdata.status.length > 20
                ? userdata.status.slice(0, 15).concat("...")
                : userdata.status}
            </p>
            <button>
              <img src={elipsisicon} alt="" className="min-w-[16px]" />
            </button>
          </div>
          <p className="text-xs text-slate-500 ml-4 my-2">Friends</p>
        </div>
      );
      friends.forEach((val, idx) => {
        var x;
        x = (
          <div
            key={val.id}
            className={
              (userOptions === val.data().uid ? "" : "hover:bg-[#e8e7fc] ") +
              "flex items-center border-y-[1px]"
            }
          >
            <div
              className="flex items-center pl-4 py-1 w-full cursor-pointer h-full"
              onClick={e => {
                e.preventDefault();
                setusertoprofile(val.data());
              }}
            >
              <img src={profileicon} alt="" className="h-[36px]" />
              <p className="ml-4 text-sm mr-auto">{val.data().username}</p>
              <p className="text-xs text-slate-500 ml-4 my-2 mr-3">
                {val.data().status.length > 20
                  ? val.data().status.slice(0, 18).concat("...")
                  : val.data().status}
              </p>
            </div>
            <div className="relative overflow-visible mr-4">
              <button
                onClick={e => {
                  e.preventDefault();
                  setuserOptions(val.data().uid);
                }}
              >
                <img src={elipsisicon} alt="" className="min-w-[16px]" />
              </button>

              <ul
                className={
                  (userOptions === val.data().uid ? "visible " : "hidden ") +
                  "absolute rounded-sm bg-slate-50 drop-shadow top-0 right-0 text-xs py-1 z-[1] "
                }
              >
                <li
                  className="mb-1 px-2 py-1 hover:bg-[#e8e7fc] cursor-pointer"
                  onClick={e => {
                    setusertochat(val.data().uid);
                    setuserOptions(0);
                  }}
                >
                  Chat
                </li>
                <li className="px-2 py-1 hover:bg-[#e8e7fc] cursor-pointer">
                  Unfriend
                </li>
              </ul>
            </div>
          </div>
        );
        // }

        userslist.push(x);
      });
      return userslist;
    }
    return <p className="text-sm text-center">loading...</p>;
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
      <div className="overflow-y-auto scrollbar-style w-full h-full mt-4 relative">
        {renderUser()}
        <div
          className={
            (userOptions !== 0 ? "visible " : "hidden ") +
            "absolute bg-transparent h-full w-full top-0 left-0"
          }
          onClick={e => {
            setuserOptions(0);
          }}
        ></div>
      </div>
    </>
  );
};

export default Users;
