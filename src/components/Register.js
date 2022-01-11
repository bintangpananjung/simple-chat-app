import React, { useState } from "react";
import usernameicon from "../assets/username.png";
import passicon from "../assets/password.png";
import emailicon from "../assets/email.png";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
const Register = props => {
  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confpass, setconfpass] = useState();

  const submit = () => {
    if (password === confpass) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(cred => {
          console.log(cred);
        })
        .catch(error => {
          console.log(error.code, error.message);
        });
    }
  };

  return (
    <>
      <form
        className="p-0 w-full h-fit flex flex-col items-center mt-auto"
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="flex bg-[#e8e7fc] rounded-md items-center h-10 w-3/4 mb-4 px-3">
          <img src={usernameicon} alt="" className="mr-3" />
          <input
            type="text"
            className="bg-transparent placeholder:text-sm placeholder:italic outline-none h-8 w-full text-sm"
            placeholder="Username (Can be change later)"
            autoComplete="off"
            onChange={e => {
              setusername(e.target.value);
            }}
          />
        </div>
        <div className="flex bg-[#e8e7fc] rounded-md items-center h-10 w-3/4 mb-4 px-3 ">
          <img src={emailicon} alt="" className="mr-3" />
          <input
            type="email"
            className="bg-transparent placeholder:text-sm placeholder:italic outline-none h-8 w-full text-sm"
            placeholder="Email address"
            autoComplete="off"
            onChange={e => {
              setemail(e.target.value);
            }}
          />
        </div>
        <div className="flex bg-[#e8e7fc] rounded-md items-center h-10 w-3/4 mb-4 px-3">
          <img src={passicon} alt="" className="mr-3" />
          <input
            type="password"
            className="bg-transparent placeholder:text-sm placeholder:italic outline-none h-8 w-full text-sm"
            placeholder="Password"
            onChange={e => {
              setpassword(e.target.value);
            }}
          />
        </div>
        <div className="flex bg-[#e8e7fc] rounded-md items-center h-10 w-3/4 mb-8 px-3">
          <img src={passicon} alt="" className="mr-3" />
          <input
            type="password"
            className="bg-transparent placeholder:text-sm placeholder:italic outline-none h-8 w-full text-sm"
            placeholder="Confirm password"
            onChange={e => {
              setconfpass(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-[#ABEDD8] rounded-md items-center h-10 w-3/4 px-3 text-center text-[#48466D] font-bold transition-all duration-100 hover:bg-[#9dd6c4] mb-8"
        >
          Register
        </button>
      </form>

      <p className=" text-gray-400 text-sm">
        already have an account?{" "}
        <Link
          to={"/auth/login"}
          className="text-[#3D84A8] hover:text-[#48466D] font-semibold"
        >
          Login
        </Link>{" "}
        here!
      </p>
      <p className=" text-gray-300 text-xs mt-5">®simple-chat-app</p>
    </>
  );
};

export default Register;
