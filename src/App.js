import "./App.css";
// import { db } from "./firebaseConfig";
import Users from "./components/Users";
import Chats from "./components/Chats";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import chaticon from "./assets/chat.png";
import usericon from "./assets/user.png";
import addusericon from "./assets/adduser.png";
import logouticon from "./assets/logout.png";
import Chat from "./components/Chat";
import User from "./components/User";
import Authentication from "./pages/Authentication";
import { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import Adduser from "./components/Adduser";
import Logout from "./components/Logout";

function App() {
  const location = useLocation();
  const [mounted, setmounted] = useState(false);
  const [user, setuser] = useState();
  const [token, settoken] = useState();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      settoken(localStorage.getItem("token"));
    }
  }, []);

  console.log(token);
  useEffect(() => {
    auth
      .getRedirectResult()
      .then(res => {
        console.log(res);
        if (res.credential) {
          settoken(res.credential.accessToken);
          localStorage.setItem("token", res.credential.accessToken);
        }
      })
      .catch(err => {
        console.log(err.code, err.message, err.email, err.credential);
      });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(signed => {
      if (signed) {
        setuser(signed.uid);
        setmounted(true);
      } else {
        setuser();
        setmounted(true);
      }
    });
  }, []);
  useEffect(() => {
    const userdata = auth.currentUser;

    if (userdata !== null) {
      userdata.providerData.forEach(profile => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
        console.log(profile);
      });
    }
  }, [user]);
  if (!location.pathname.match(/^\/auth+\/(login|register)$/i) && !user) {
    return <Navigate to={"/auth/login"} />;
  }
  if (location.pathname.match(/^\/auth+\/(login|register)$/i) && user) {
    return <Navigate to={"/users"} />;
  }
  if (!mounted) {
    return <></>;
  }
  if (!user) {
    return (
      <>
        <Routes>
          <Route path={"/auth/*"} element={<Authentication />} />
        </Routes>
      </>
    );
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen min-h-fit bg-[#cee3ee]">
        <div className="flex w-10/12 h-5/6 min-w-[57rem] min-h-[31rem] bg-[#48466D] rounded-3xl overflow-hidden py-4 pr-4">
          <div className="h-full flex flex-col justify-center items-center w-24 min-w-[4rem]">
            <Link
              to={"/users"}
              className={
                "py-2 w-full flex justify-center transition-all duration-75 hover:border-l-slate-50 hover:border-l-4" +
                (location.pathname === "/users"
                  ? "border-l-slate-50 border-l-4 "
                  : "")
              }
            >
              <img src={usericon} alt="" />
            </Link>
            <Link
              to={"/chats"}
              className={
                "py-2 w-full flex justify-center transition-all duration-75 hover:border-l-slate-50 hover:border-l-4" +
                (location.pathname === "/chats"
                  ? "border-l-slate-50 border-l-4 "
                  : "")
              }
            >
              <img src={chaticon} alt="" />
            </Link>
            <Link
              to={"/adduser"}
              className={
                "py-2 w-full flex justify-center transition-all duration-75 hover:border-l-slate-50 hover:border-l-4" +
                (location.pathname === "/adduser"
                  ? "border-l-slate-50 border-l-4 "
                  : "")
              }
            >
              <img src={addusericon} alt="" />
            </Link>
            <Link
              to={"/logout"}
              className={
                "py-2 w-full flex justify-center transition-all duration-75 hover:border-l-slate-50 hover:border-l-4 pl-1" +
                (location.pathname === "/logout"
                  ? "border-l-slate-50 border-l-4 "
                  : "")
              }
            >
              <img src={logouticon} alt="" />
            </Link>
          </div>
          <div className="flex w-full h-full bg-[#e8e7fc] rounded-2xl p-3">
            <div className="flex flex-col h-full w-[18rem] min-w-[18rem] bg-slate-50 rounded-2xl shadow-xl mr-3 items-center pt-3 overflow-y-auto relative">
              <Routes>
                <Route path={"/users"} element={<Users />} />
                <Route path={"/chats"} element={<Chats />} />
                <Route path={"/logout"} element={<Logout func={setuser} />} />
                <Route path={"/adduser"} element={<Adduser />} />
              </Routes>
            </div>
            <div className="flex flex-col h-full w-full p-3 pb-0 min-w-[307px]">
              <Chat />
            </div>
          </div>
          <div className="flex flex-col w-[23rem] ml-4 bg-slate-50 rounded-2xl p-3 items-center min-w-[180px]">
            <User />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
