import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const Logout = ({ func }) => {
  const navigate = useNavigate();
  const logout = () => {
    auth.signOut().then(func());
    localStorage.clear();
  };
  return (
    <>
      <div className="flex flex-col w-full items-center h-full justify-center">
        <p className="text-md mb-5">Are you sure want to logout?</p>
        <div className="flex w-full justify-center">
          <button
            className="bg-[#ABEDD8] w-[4rem] py-[0.4rem] text-xs h-fit rounded-lg hover:bg-[#a1dfca] mr-5"
            onClick={e => {
              e.preventDefault();
              logout();
            }}
          >
            Yes
          </button>
          <button
            className="bg-[#FC997C] w-[4rem] py-[0.4rem] text-xs h-fit rounded-lg hover:bg-[#f19478]"
            onClick={() => {
              navigate("/users");
            }}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default Logout;
