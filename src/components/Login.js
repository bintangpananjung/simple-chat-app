import React, { useState } from "react";
import passicon from "../assets/password.png";
import emailicon from "../assets/email.png";
import googleicon from "../assets/google.png";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import firebase from "firebase/app";
const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const submit = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        // if (res.additionalUserInfo.isNewUser) {
        //   db.collection("users").add({
        //     name: res.user.displayName,
        //     status: "",
        //     uid: res.user.uid,
        //     username: res.user.displayName,
        //     friends: [],
        //   });
        // }
        console.log(res);
      })
      .catch(err => {
        console.log(err.code, err.message);
      });
  };
  const googlesignin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  };
  return (
    <>
      <form
        className="p-0 w-full h-fit flex flex-col items-center mt-10"
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="flex bg-[#e8e7fc] rounded-md items-center h-10 w-3/4 mb-4 px-3">
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
        <div className="flex bg-[#e8e7fc] rounded-md items-center h-10 w-3/4 mb-8 px-3">
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
        <button
          type="submit"
          className="bg-[#ABEDD8] rounded-md items-center h-10 w-3/4 px-3 text-center text-[#48466D] font-bold transition-all duration-100 hover:bg-[#9dd6c4]"
        >
          Sign In
        </button>
      </form>
      <p className="mt-5 text-gray-400">or</p>
      <div className="flex flex-col w-3/4 mt-5 mb-6">
        <button
          className="flex items-center w-full p-2 bg-slate-50 shadow-md rounded-lg"
          onClick={e => {
            e.preventDefault();
            googlesignin();
          }}
        >
          <img src={googleicon} alt="" className="mr-2" />
          <p className="text-sm text-[#48466D] w-full text-center font-semibold">
            Sign in with Google
          </p>
        </button>
      </div>
      <p className=" text-gray-400 text-sm">
        don't have an account yet?{" "}
        <Link
          to={"/auth/register"}
          className="text-[#3D84A8] hover:text-[#48466D] font-semibold"
        >
          Register
        </Link>{" "}
        here!
      </p>
      <p className=" text-gray-300 text-xs mt-5">®simple-chat-app</p>
    </>
  );
};

export default Login;
