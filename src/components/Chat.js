import React, { useState, useEffect, useRef } from "react";
import profilepic from "../assets/profile.png";
import elipsisicon from "../assets/elipsis.png";
import addicon from "../assets/add.png";
import sendicon from "../assets/send-arrow.png";
import { db } from "../firebaseConfig";
import firebase from "firebase/app";
import { getDateofListMessage } from "../helper/time_helper";
// import { db } from "../firebaseConfig";
const Chat = ({ usertochat, usernames, userdata }) => {
  const [data, setdata] = useState([]);
  const [chatState, setchatState] = useState(false);
  const [chatInput, setchatInput] = useState();
  const [latestChat, setlatestChat] = useState({ timestamp: 0 });

  useEffect(() => {
    setchatState(false);
  }, [usertochat]);
  const addChat = message => {
    if (usertochat && message) {
      // console.log(message);
      db.collection("message")
        .add({
          message: message,
          sender: userdata.uid,
          receiver: usertochat,
          timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  async function getMessage() {
    const sender = db
      .collection("message")
      .where("sender", "==", userdata.uid)
      .where("receiver", "==", usertochat)
      .get();
    const receiver = db
      .collection("message")
      .where("receiver", "==", userdata.uid)
      .where("sender", "==", usertochat)
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
    if (usertochat && userdata.uid) {
      return getMessage().then(result => {
        var tempArr = [];
        var res = result.sort((a, b) => {
          return b.data().timestamp - a.data().timestamp;
        });
        res.forEach(val => {
          // console.log(val.data());
          tempArr.push({
            message: val.data().message,
            send: val.data().receiver === userdata.uid ? 0 : 1,
            timestamp: val.data().timestamp.seconds,
          });
        });
        setdata(tempArr);
        if (tempArr.length > 0) {
          setlatestChat({
            timestamp:
              (res[0].data().timestamp.seconds +
                res[0].data().timestamp.nanoseconds / 1000000000) *
              1000,
          });
        } else {
          setlatestChat({
            timestamp:
              (firebase.firestore.Timestamp.now().seconds +
                firebase.firestore.Timestamp.now().nanoseconds / 1000000000) *
              1000,
          });
        }

        setchatState(true);
      });
    }
  }, [userdata, usertochat]);

  // console.log(latestChat);
  useEffect(() => {
    // console.log(chatState);
    if (data && chatState) {
      return db
        .collection("message")
        .where("timestamp", ">", new Date(latestChat.timestamp))
        .onSnapshot(res => {
          var temp = data;
          // console.log(temp);
          var nanoseconds = 0;
          // console.log(latestChat);
          // console.log(data);
          res.forEach(val => {
            if (
              (val.data().sender === userdata.uid &&
                val.data().receiver === usertochat) ||
              (val.data().receiver === userdata.uid &&
                val.data().sender === usertochat)
            ) {
              // console.log(val.data());
              if (temp.length > 0) {
                if (val.data().timestamp.seconds > temp[0].timestamp) {
                  temp.unshift({
                    message: val.data().message,
                    send: val.data().receiver === userdata.uid ? 0 : 1,
                    timestamp: val.data().timestamp.seconds,
                  });

                  nanoseconds =
                    nanoseconds > val.data().timestamp.nanoseconds
                      ? nanoseconds
                      : val.data().timestamp.nanoseconds;
                }
              } else {
                // console.log(val.data().timestamp.seconds, latestChat.timestamp);
                if (
                  val.data().timestamp.seconds >
                  latestChat.timestamp / 1000
                ) {
                  temp.unshift({
                    message: val.data().message,
                    send: val.data().receiver === userdata.uid ? 0 : 1,
                    timestamp: val.data().timestamp.seconds,
                  });

                  nanoseconds =
                    nanoseconds > val.data().timestamp.nanoseconds
                      ? nanoseconds
                      : val.data().timestamp.nanoseconds;
                }
              }
            }
          });
          // console.log((temp[0].timestamp + nanoseconds / 1000000000) * 1000);
          if (temp.length > 0) {
            setlatestChat({
              timestamp: (temp[0].timestamp + nanoseconds / 1000000000) * 1000,
            });
          } else {
            setlatestChat({
              timestamp:
                (firebase.firestore.Timestamp.now().seconds +
                  firebase.firestore.Timestamp.now().nanoseconds / 1000000000) *
                1000,
            });
          }

          setdata(temp);
        });
    }
  }, [chatState]);

  const renderChat = () => {
    if (data) {
      // console.log(data);
      var now = new Date();
      var prevtime = 0;
      return data.map((val, idx) => {
        var temp;
        var messageDate;
        var timemap = new Date(val.timestamp * 1000);
        if (prevtime !== 0) {
          messageDate = getDateofListMessage(prevtime, timemap, now);
        }
        prevtime = timemap;

        if (val.send === 1) {
          temp = (
            <div key={val.timestamp}>
              {data.length === idx + 1
                ? getDateofListMessage(
                    prevtime,
                    new Date((val.timestamp - 86400) * 1000),
                    now
                  )
                : ""}
              <div className="flex flex-row-reverse pb-2 items-start mb-1 mr-1">
                <img src={profilepic} alt="" className="ml-2" />
                <div className="flex flex-col items-end w-full">
                  <p className="bg-[#ABEDD8] w-fit max-w-[calc(100%_-_50px)] rounded-xl rounded-tr-none shadow-[-5px_5px_5px_rgba(0,0,0,0.10)] py-1 px-3 text-[0.75rem]">
                    {val.message}
                  </p>

                  <p className="text-[10px] mt-1 mr-1 text-gray-400">
                    {new Date(val.timestamp * 1000)
                      .toLocaleTimeString(["ban", "id"])
                      .slice(0, 5)}
                  </p>
                </div>
              </div>
              {messageDate}
            </div>
          );
        } else {
          temp = (
            <div key={val.timestamp}>
              {/* {data.length === idx + 1
                ? console.log(new Date((val.timestamp - 86400) * 1000), timemap)
                : ""} */}
              {data.length === idx + 1
                ? getDateofListMessage(
                    prevtime,
                    new Date((val.timestamp - 86400) * 1000),
                    now
                  )
                : ""}
              <div className="flex pb-2 items-start mb-1">
                <img src={profilepic} alt="" className="mr-2" />
                <div className="flex flex-col items-start w-full">
                  <div className="bg-slate-50 max-w-[calc(100%_-_50px)] rounded-xl rounded-tl-none shadow-[5px_5px_5px_rgba(0,0,0,0.10)] py-1 px-3 text-[0.75rem]">
                    {val.message}
                  </div>
                  <p className="text-[10px] mt-1 ml-1 text-gray-400">
                    {new Date(val.timestamp * 1000)
                      .toLocaleTimeString(["ban", "id"])
                      .slice(0, 5)}
                  </p>
                </div>
              </div>
              {messageDate}
            </div>
          );
        }
        return temp;
      });
    } else {
      return "";
    }
  };
  const renderName = () => {
    if (usertochat && usernames) {
      // console.log(usertochat, usernames);
      return (
        <>
          <button className="mr-3">
            <img src={profilepic} alt="" />
          </button>
          <p className="text-sm mr-auto">
            {/* {console.log(usertochat)} */}
            {usertochat && usernames
              ? usernames.filter(e => e.uid === usertochat)[0].username
              : ""}
          </p>
          <button>
            <img src={elipsisicon} alt="" />
          </button>
        </>
      );
    }
    return "";
  };
  return (
    <>
      <div className="flex w-full items-center border-gray-300 border-b-[1px] pb-2">
        {renderName()}
      </div>
      <div className="flex flex-col-reverse overflow-y-auto scrollbar-style w-full pt-3 mb-auto">
        {renderChat()}
      </div>
      <div
        className={
          (usertochat ? "visible " : "hidden ") +
          "flex w-full h-11 bg-slate-50 rounded-2xl items-center px-2 min-h-[44px] mt-1"
        }
      >
        <button className="mr-2">
          <img src={addicon} alt="" />
        </button>
        <form
          className="w-full flex h-full"
          onSubmit={e => {
            e.preventDefault();
            addChat(chatInput);
            setchatInput();
          }}
        >
          <input
            type="text"
            className="bg-transparent outline-none text-xs placeholder:text-gray-300 placeholder:text-xs mr-auto w-full h-full"
            placeholder="Type message here..."
            onChange={e => {
              e.preventDefault();
              setchatInput(e.target.value);
            }}
            value={chatInput ? chatInput : ""}
          />
          <button type="submit" className="hover:scale-105">
            <img
              src={sendicon}
              alt=""
              className="transition-all duration-100 hover:scale-105"
            />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
