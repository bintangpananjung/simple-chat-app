import React, { useState, useEffect } from "react";
import profilepic from "../assets/profile-90px.png";
import expandicon from "../assets/expand-arrow.png";
import editprofileicon from "../assets/edit-profile.png";
import { db } from "../firebaseConfig";
const User = ({ usertoprofile, userdata }) => {
  const [editUsername, seteditUsername] = useState(false);
  const [editStatus, seteditStatus] = useState(false);
  const [newUsername, setnewUsername] = useState();
  const [newStatus, setnewStatus] = useState();
  useEffect(() => {
    if (usertoprofile) {
      setnewUsername(usertoprofile.username);
      setnewStatus(usertoprofile.status);
    }
  }, [usertoprofile]);
  return (
    <>
      {usertoprofile ? (
        <>
          <button className="my-5">
            <img src={profilepic} alt="" />
          </button>

          {usertoprofile.uid === userdata.uid ? (
            <>
              <div className="flex w-full items-center justify-center mb-1 px-4">
                {editUsername ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      db.collection("users")
                        .where("uid", "==", usertoprofile.uid)
                        .get()
                        .then(async res => {
                          await res.docs[0].ref.update({
                            username: newUsername,
                          });
                        })
                        .catch(err => {
                          console.log(err);
                        });
                      seteditUsername(false);
                    }}
                  >
                    <input
                      className={
                        "w-full text-lg font-semibold mr-1 outline-none bg-[#e8e7fc] h-fit px-1 py-[0.1rem] rounded-[0.5rem]"
                      }
                      defaultValue={usertoprofile.username}
                      onChange={e => {
                        setnewUsername(e.target.value);
                      }}
                      title="set name"
                    />
                  </form>
                ) : (
                  <p
                    className="text-lg text-center font-semibold py-[0.1rem] h-fit"
                    title="name"
                  >
                    {usertoprofile.username}
                  </p>
                )}
                <button
                  title="edit username"
                  onClick={e => {
                    e.preventDefault();
                    if (editUsername) {
                      seteditUsername(false);
                    } else {
                      seteditUsername(true);
                    }
                  }}
                >
                  <img
                    src={editprofileicon}
                    alt=""
                    className="min-w-[14px] w-[14px] ml-1"
                  />
                </button>
              </div>
              <div className="flex w-full items-center justify-center mb-1 px-4">
                {editStatus ? (
                  <form
                    onSubmit={e => {
                      // console.log(newStatus);
                      e.preventDefault();
                      db.collection("users")
                        .where("uid", "==", usertoprofile.uid)
                        .get()
                        .then(async res => {
                          await res.docs[0].ref.update({
                            status: newStatus ? newStatus : "",
                          });
                        })
                        .catch(err => {
                          console.log(err);
                        });
                      seteditStatus(false);
                    }}
                  >
                    <input
                      className={
                        "w-full text-xs text-gray-400 mr-1 outline-none bg-[#e8e7fc] h-fit px-1 py-[0.1rem] rounded-[0.5rem]"
                      }
                      defaultValue={usertoprofile.status}
                      onChange={e => {
                        setnewStatus(e.target.value);
                      }}
                      title="set status"
                    />
                  </form>
                ) : (
                  <p
                    className="text-xs text-center text-gray-400 mb-auto h-fit py-[0.1rem]"
                    title="status"
                  >
                    {usertoprofile.status.length > 0 ? (
                      usertoprofile.status
                    ) : (
                      <span className="italic">type your status here...</span>
                    )}
                  </p>
                )}
                <button
                  onClick={e => {
                    e.preventDefault();
                    if (editStatus) {
                      seteditStatus(false);
                    } else {
                      seteditStatus(true);
                    }
                  }}
                  title="edit status"
                >
                  <img
                    src={editprofileicon}
                    alt=""
                    className="min-w-[14px] w-[14px] ml-1"
                  />
                </button>
              </div>
            </>
          ) : (
            <>
              <p
                className="text-lg text-center font-semibold mr-1 py-[0.1rem]"
                title="name"
              >
                {usertoprofile.username}
              </p>
              <p
                className="text-xs text-center text-gray-400 py-[0.1rem]"
                title="status"
              >
                {usertoprofile.status}
              </p>
            </>
          )}

          <div className="flex rounded-2xl items-center w-full mt-auto mb-2 bg-[#e8e7fc] p-2">
            <div className="rounded-full h-8 w-8 bg-blue-500 mr-3"></div>
            <p className="text-sm mr-auto font-semibold">Notes</p>
            <button>
              <img src={expandicon} alt="" />
            </button>
          </div>
          <div className="flex rounded-2xl items-center w-full mb-2 bg-[#e8e7fc] py-1 px-2">
            <div className="rounded-full h-8 w-8 bg-blue-500 mr-3"></div>
            <p className="text-sm mr-auto font-semibold">Media</p>
            <button>
              <img src={expandicon} alt="" />
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default User;
