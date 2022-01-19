import React from "react";
// import { db } from "../firebaseConfig";
import searchicon from "../assets/search.png";
import profileicon from "../assets/profile.png";
import elipsisicon from "../assets/elipsis.png";
const Users = ({ friends, userdata, setusertoprofile }) => {
  // const [data, setdata] = useState();
  // console.log(data);
  //get user data

  const renderUser = () => {
    if (friends && userdata) {
      var userslist = [];
      userslist.push(
        <div key={userdata.uid}>
          <p className="text-xs text-slate-500 ml-4 my-2">You</p>
          <div className="flex items-center border-y-[1px] px-4 py-1 cursor-default hover:bg-[#e8e7fc]">
            <img src={profileicon} alt="" className="h-[36px]" />
            <p className="ml-4 text-sm mr-auto">{userdata.username}</p>
            <p className="text-xs text-slate-500 ml-4 my-2 mr-3">
              {userdata.status}
            </p>
            <button>
              <img src={elipsisicon} alt="" className="min-w-[16px]" />
            </button>
          </div>
          <p className="text-xs text-slate-500 ml-4 my-2">Friends</p>
        </div>
      );
      friends.forEach(val => {
        var x;
        x = (
          <div
            key={val.id}
            className="flex items-center border-y-[1px] px-4 py-1 cursor-pointer hover:bg-[#e8e7fc]"
            onClick={e => {
              e.preventDefault();
              setusertoprofile(val.data());
            }}
          >
            <img src={profileicon} alt="" className="h-[36px]" />
            <p className="ml-4 text-sm mr-auto">{val.data().username}</p>
            <p className="text-xs text-slate-500 ml-4 my-2 mr-3">
              {val.data().status}
            </p>
            <button>
              <img src={elipsisicon} alt="" className="min-w-[16px]" />
            </button>
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
      <div className="overflow-y-auto scrollbar-style w-full mt-4">
        {renderUser()}
        {/* {data
          ? data.forEach(val => {
              console.log(val.data());
            })
          : ""} */}
      </div>
    </>
  );
};

export default Users;
