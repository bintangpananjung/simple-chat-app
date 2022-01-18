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
import { useState, useEffect, useRef } from "react";
import { db, auth } from "./firebaseConfig";
import Adduser from "./components/Adduser";
import Logout from "./components/Logout";

function App() {
  const location = useLocation();
  const [mounted, setmounted] = useState(false);
  const [user, setuser] = useState();
  const [userdata, setuserdata] = useState({
    uid: null,
    status: null,
    name: null,
    username: null,
    friends: ["false"],
  });
  const [token, settoken] = useState();
  const [friends, setfriends] = useState();
  const [chats, setchats] = useState([]);
  const [usertochat, setusertochat] = useState();
  const [friendusername, setfriendusername] = useState([]);
  const [latestChats, setlatestChats] = useState();

  const isUserSet = useRef(false);

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
    auth
      .getRedirectResult()
      .then(res => {
        // console.log(res);
        if (res.credential) {
          console.log(res.additionalUserInfo);
          if (res.additionalUserInfo.isNewUser) {
            console.log("new");
            db.collection("users")
              .add({
                name: res.user.displayName,
                status: "",
                uid: res.user.uid,
                username: res.user.displayName,
                friends: [],
              })
              .then();
          }
          settoken(res.credential.accessToken);

          localStorage.setItem("token", res.credential.accessToken);
        }
      })
      .catch(err => {
        console.log(err.code, err.message, err.email, err.credential);
      });
  }, []);
  useEffect(() => {
    const query = db.collection("users").where("uid", "in", userdata.friends);

    return query.onSnapshot(res => {
      // console.log(res);
      setfriends(res);
      var tempArr = [];
      res.forEach(val => {
        tempArr.push(val.data());
      });
      setfriendusername(tempArr);
    });
    // }
  }, [userdata]);

  async function getChats() {
    const sender = db
      .collection("message")
      .where("sender", "==", userdata.uid)
      .get();
    const receiver = db
      .collection("message")
      .where("receiver", "==", userdata.uid)
      .get();
    const [senderSnapshot, receiverSnapshot] = await Promise.all([
      sender,
      receiver,
    ]);

    const senderArr = senderSnapshot.docs;
    const receiverArr = receiverSnapshot.docs;

    return senderArr.concat(receiverArr);
  }

  useEffect(() => {
    if (userdata.uid) {
      return getChats().then(result => {
        var tempArr = chats;
        var res = result.sort((a, b) => {
          return b.data().timestamp - a.data().timestamp;
        });
        res.forEach(val => {
          // console.log(val.data());
          if (
            val.data().sender === userdata.uid ||
            val.data().receiver === userdata.uid
          ) {
            if (
              !tempArr.some(
                obj =>
                  obj.uid === val.data().sender ||
                  obj.uid === val.data().receiver
              )
            ) {
              tempArr.push({
                uid:
                  val.data().receiver === userdata.uid
                    ? val.data().sender
                    : val.data().receiver,
                message: val.data().message,
                send: val.data().receiver === userdata.uid ? 0 : 1,
                timestamp: val.data().timestamp.seconds,
              });
              setchats(tempArr);
              setlatestChats(
                latestChats > tempArr[tempArr.length - 1].timestamp
                  ? latestChats
                  : tempArr[tempArr.length - 1].timestamp
              );
            } else {
              // console.log(tempArr);
              const idxUser = tempArr.findIndex(
                obj =>
                  obj.uid === val.data().sender ||
                  obj.uid === val.data().receiver
              );
              if (val.data().timestamp.seconds > tempArr[idxUser].timestamp) {
                console.log(val.data());
                tempArr[idxUser] = {
                  uid:
                    val.data().receiver === userdata.uid
                      ? val.data().sender
                      : val.data().receiver,
                  message: val.data().message,
                  send: val.data().receiver === userdata.uid ? 0 : 1,
                  timestamp: val.data().timestamp.seconds,
                };
                setchats(tempArr);
                setlatestChats(
                  latestChats > tempArr[idxUser].timestamp
                    ? latestChats
                    : tempArr[idxUser].timestamp
                );
              }
            }
          }
        });
      });
    }
  }, [userdata]);

  //get chat as sender

  useEffect(() => {
    if (latestChats) {
      return db
        .collection("message")
        .where("timestamp", ">", new Date(latestChats))
        .onSnapshot(res => {
          res.forEach(val => {
            if (
              val.data().sender === userdata.uid ||
              val.data().receiver === userdata.uid
            ) {
              var tempArr = chats;
              if (
                !tempArr.some(
                  obj =>
                    obj.uid === val.data().sender ||
                    obj.uid === val.data().receiver
                )
              ) {
                tempArr.push({
                  uid:
                    val.data().receiver === userdata.uid
                      ? val.data().sender
                      : val.data().receiver,
                  message: val.data().message,
                  send: val.data().receiver === userdata.uid ? 0 : 1,
                  timestamp: val.data().timestamp.seconds,
                });
                setchats(tempArr);
                setlatestChats(
                  latestChats > tempArr[tempArr.length - 1].timestamp
                    ? latestChats
                    : tempArr[tempArr.length - 1].timestamp
                );
              } else {
                // console.log(tempArr);
                const idxUser = tempArr.findIndex(
                  obj =>
                    obj.uid === val.data().sender ||
                    obj.uid === val.data().receiver
                );
                if (val.data().timestamp.seconds > tempArr[idxUser].timestamp) {
                  // console.log(val.data());
                  tempArr[idxUser] = {
                    uid:
                      val.data().receiver === userdata.uid
                        ? val.data().sender
                        : val.data().receiver,
                    message: val.data().message,
                    send: val.data().receiver === userdata.uid ? 0 : 1,
                    timestamp: val.data().timestamp.seconds,
                  };
                  setchats(tempArr);
                  setlatestChats(
                    latestChats > tempArr[idxUser].timestamp
                      ? latestChats
                      : tempArr[idxUser].timestamp
                  );
                }
              }
            }
          });
        });
    }
  }, [latestChats]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .where("uid", "==", user)
        .onSnapshot(res => {
          var temp;
          res.forEach(val => {
            temp = val.data();
          });
          setuserdata(temp);
          isUserSet.current = true;
        });
    }
  }, [user]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      settoken(localStorage.getItem("token"));
    }
  }, []);

  // console.log(userdata);
  // console.log("a");

  // useEffect(() => {
  //   const userdata = auth.currentUser;

  //   if (userdata !== null) {
  //     userdata.providerData.forEach(profile => {
  //       console.log("Sign-in provider: " + profile.providerId);
  //       console.log("  Provider-specific UID: " + profile.uid);
  //       console.log("  Name: " + profile.displayName);
  //       console.log("  Email: " + profile.email);
  //       console.log("  Photo URL: " + profile.photoURL);
  //       console.log(profile);
  //     });
  //   }
  // }, [user]);
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
                <Route
                  path={"/users"}
                  element={<Users friends={friends} userdata={userdata} />}
                />
                <Route
                  path={"/chats"}
                  element={
                    <Chats
                      chats={chats}
                      usernames={friendusername}
                      usertochat={setusertochat}
                    />
                  }
                />
                <Route path={"/logout"} element={<Logout func={setuser} />} />
                <Route
                  path={"/adduser"}
                  element={
                    <Adduser
                      friendusername={friendusername}
                      userdata={userdata}
                      setusertochat={setusertochat}
                    />
                  }
                />
              </Routes>
            </div>
            <div className="flex flex-col h-full w-full p-3 pb-0 min-w-[307px]">
              <Chat
                usertochat={usertochat}
                usernames={friendusername}
                userdata={userdata}
              />
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
