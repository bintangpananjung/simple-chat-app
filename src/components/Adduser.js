import React, { useState } from "react";
import searchicon from "../assets/search.png";
import profilepic from "../assets/profile-90px.png";
import { db } from "../firebaseConfig";
// import { useNavigate } from "react-router-dom";

const Adduser = ({ userdata, friendusername, setusertochat }) => {
  const [searchBy, setsearchBy] = useState("name");
  const [searchInput, setsearchInput] = useState();
  const [userFound, setuserFound] = useState();
  // console.log(userFound);
  // const navigate = useNavigate();
  const searchUser = () => {
    const query = db.collection("users");
    if (searchBy === "name") {
      query
        .where("name", "==", searchInput)
        .get()
        .then(res => {
          if (!res.empty) {
            setuserFound(res.docs[0].data());
          } else {
            setuserFound();
          }
        });
    } else {
      query
        .where("email", "==", searchInput)
        .get()
        .then(res => {
          if (!res.empty) {
            setuserFound(res.docs[0].data());
          } else {
            setuserFound();
          }
        });
    }
  };

  const renderUser = () => {
    if (userFound) {
      return (
        <>
          <div className="flex flex-col items-center mt-2 p-5 w-full mx-1 border-y-[1px] ">
            <img src={profilepic} alt="" className="min-w-[90px]" />
            <p className="text-sm mt-2 mb-1 text-center">
              {userFound.username}
            </p>
            <button
              className="text-xs bg-[#ABEDD8] w-[6rem] py-[0.2rem] h-fit rounded-lg hover:bg-[#a1dfca] mt-2 drop-shadow-sm"
              onClick={e => {
                if (e.target.innerHTML === "Chat") {
                  setusertochat(userFound.uid);
                } else {
                  db.collection("users")
                    .where("uid", "==", userdata.uid)
                    .get()
                    .then(async res => {
                      var temp = res.docs[0].data().friends;
                      temp.push(userFound.uid);
                      await res.docs[0].ref.update({
                        friends: temp,
                      });
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }
              }}
            >
              {friendusername.filter(val => val.name === userFound.name)
                .length > 0
                ? "Chat"
                : "Add"}
            </button>
          </div>
        </>
      );
    } else {
      return (
        <div className="flex flex-col items-center mt-2 p-5 w-full mx-1 border-y-[1px] ">
          <p className="text-xs">user not found</p>
        </div>
      );
    }
  };

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          searchUser();
          // console.log(searchBy);
        }}
      >
        <div className="flex bg-[#e8e7fc] rounded-md items-center w-[15rem]">
          <img src={searchicon} alt="" className="h-5 mx-2" />
          <input
            type={searchBy === "email" ? "email" : "text"}
            className="bg-transparent placeholder:text-sm placeholder:italic outline-none h-8 w-full text-sm"
            placeholder="Search User"
            value={searchInput ? searchInput : ""}
            onChange={e => {
              setsearchInput(e.target.value);
            }}
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
      {renderUser()}
    </>
  );
};

export default Adduser;
