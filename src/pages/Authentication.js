import React from "react";
// import { auth } from "../firebaseConfig";
import loginicon from "../assets/login-100px.png";

import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

const Authentication = () => {
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(cred => {
  //       var user = cred.user;
  //     })
  //     .catch(error => {
  //       console.log(error.code);
  //       console.log(error.message);
  //     });
  return (
    <>
      <div className="flex justify-center items-center min-h-fit h-screen min-w-fit bg-[#cee3ee]">
        <div className="flex flex-col w-1/4 h-[40rem] min-w-[30rem] min-h-[31rem] max-h-fit bg-[#48466D] rounded-3xl overflow-hidden py-4 px-4">
          <div className="flex flex-col w-full h-[10rem] items-center justify-center mb-4">
            <div className="">
              <img src={loginicon} alt="" className="h-37" />
            </div>
            <p className="text-xl text-slate-50 tracking-widest font-bold">
              {useLocation().pathname === "/auth/login" ? "Sign In" : ""}
              {useLocation().pathname === "/auth/register" ? "Register" : ""}
            </p>
          </div>
          <div className="flex flex-col items-center w-full h-full bg-slate-50 rounded-2xl p-3">
            <Routes>
              <Route path={"login"} element={<Login />} />
              <Route path={"register"} element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
