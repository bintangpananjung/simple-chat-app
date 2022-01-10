import "./App.css";
// import { db } from "./firebaseConfig";
import Users from "./components/Users";
import Chats from "./components/Chats";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import chaticon from "./assets/chat.png";
import usericon from "./assets/user.png";
import addusericon from "./assets/adduser.png";
import settingicon from "./assets/setting.png";
import Chat from "./components/Chat";
import User from "./components/User";

function App() {
  const location = useLocation();
  return (
    <>
      <div className="flex justify-center items-center h-screen min-h-fit bg-[#cee3ee]">
        <div className="flex w-10/12 h-5/6 min-w-[50rem] min-h-[31rem] bg-[#48466D] rounded-3xl overflow-hidden py-4 pr-4">
          <div className="h-full flex flex-col justify-center items-center w-24 min-w-[4rem]">
            <Link
              to={"/users"}
              className={
                "py-2 w-full flex justify-center transition-all duration-75 hover:border-l-white hover:border-l-4" +
                (location.pathname === "/users"
                  ? "border-l-white border-l-4 "
                  : "")
              }
            >
              <img src={usericon} alt="" />
            </Link>
            <Link
              to={"/chats"}
              className={
                "py-2 w-full flex justify-center transition-all duration-75 hover:border-l-white hover:border-l-4" +
                (location.pathname === "/chats"
                  ? "border-l-white border-l-4 "
                  : "")
              }
            >
              <img src={chaticon} alt="" />
            </Link>
            <Link
              to={"/adduser"}
              className={
                "py-2 w-full flex justify-center transition-all duration-75 hover:border-l-white hover:border-l-4" +
                (location.pathname === "/adduser"
                  ? "border-l-white border-l-4 "
                  : "")
              }
            >
              <img src={addusericon} alt="" />
            </Link>
            <Link
              to={"/settings"}
              className={
                "py-2 w-full flex justify-center transition-all duration-75 hover:border-l-white hover:border-l-4" +
                (location.pathname === "/settings"
                  ? "border-l-white border-l-4 "
                  : "")
              }
            >
              <img src={settingicon} alt="" />
            </Link>
          </div>
          <div className="flex w-full h-full bg-[#e8e7fc] rounded-2xl p-3">
            <div className="flex flex-col h-full w-[18rem] min-w-[18rem] bg-slate-50 rounded-2xl shadow-xl mr-3 items-center pt-3 overflow-y-auto relative">
              <Routes>
                <Route path={"/users"} element={<Users />} />
                <Route path={"/chats"} element={<Chats />} />
              </Routes>
            </div>
            <div className="flex flex-col h-full w-full min-w-0 p-3 pb-0 min-w-[307px]">
              <Chat />
            </div>
          </div>
          <div className="flex flex-col w-[23rem] ml-4 bg-slate-50 rounded-2xl p-3 items-center">
            <User />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
