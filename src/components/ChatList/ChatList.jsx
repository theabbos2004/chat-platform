import React, { memo,  useCallback,  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddChatModal,  isChatListRr, setChatsRr } from "../../Reducer/ChatReducer";
import { timeAgo } from "../../Hook/timeAgo";
import { Link } from "react-router-dom";
import { CreateChatModal } from "../shared/index";
import style from "./index.module.scss"

function ChatList({ className }) {
  const {user} = useSelector((store) => store?.authStore);
  const {isAddChatModal,chats} = useSelector((store) => store?.chatStore);

  const [chatSearch, setChatSearch] = useState();

  const dispatch = useDispatch();
 
    const setActiveChat=useCallback((chatP)=>{
      let resultChats=user?.chats?.map(chat=>{
          if(chat.$id===chatP?.$id){
          return {...chat,active:true}
          }
          else{
          return {...chat,active:false}
          }
      })
      dispatch(setChatsRr(resultChats))
  },[user,dispatch])

  useEffect(() => {
    if(user?.chats){
      setActiveChat(user?.chats[0])
    } 
},[user,setActiveChat]);

  return (
    <section
      className={`h-100 container ${className} z-3`}
      style={{ borderRight: "0.2rem solid var(--border-color)" }}
    >
      {/* profile */}
      <div
        className="py-1 d-flex align-items-center justify-content-between"
        style={{ height: "8%" }}
      >
        <Link
          to="/profile"
          className="col-10 col-sm-12 d-flex rounded-3 cursor-pointer py-4  text-decoration-none"
          style={{
            height: "90%",
          }}
        >
          <div className="col-3 col-md-2 col-lg-3 m-0 d-flex align-items-center">
            <div
              className="bg-secondary rounded-5 position-relative"
              style={{ width: "2.2rem",height:"2.2rem",border:"0.2rem solid var(--border-color)"}}
            >
              <img
                src={
                  user?.avatar
                    ? user?.avatar
                    : require("../../assets/img/profile-anonim.png")
                }
                alt="profile"
                className="w-100 h-100 rounded-5 object-fit-cover"
              />
            </div>
          </div>
          <div className="col-6 col-lg-7 d-flex align-items-center">
            <div className="text-light fw-bolder">{user?.userName}</div>
          </div>
        </Link>
        <div
          className="col-2 d-sm-none d-flex justify-content-center"
          onClick={() => dispatch(isChatListRr(false))}
        >
          <i
            className="bi bi-x fs-3 text-light"
            style={{ fontSize: "0.6rem" }}
          ></i>
        </div>
      </div>
      {/* search chat */}
      <div
        className="w-100 pt-2 d-flex justify-content-center align-items-center"
        style={{ height: "8%" }}
      >
        <input
          type="search"
          id="search_id"
          className={`w-100 rounded-3 p-2 border-0 ${style.search}`}
          placeholder="search chat"
          style={{ height: "100%",color: "var(--secondary-color)",backgroundColor: "var(--chat-btn-color)",outline:"none"}}
          onChange={(e) => setChatSearch(e.target.value)}
        />
      </div>
      {/* Chat list */}
      <div className="overflow-y-scroll overflow-x-hidden my-2 pe-1" style={{ height: "74%" }}>
        <ul className="h-100 list-group">
          <li className="my-2 text-secondary fw-semibold">Chats</li>
          {chats?.length > 0
            && chats?.filter((chat) => {
                if (chatSearch) {
                  let req = null;
                  chat.title.includes(chatSearch) && (req = chat);
                  return req;
                } else {
                  return chat;
                }
              })?.map((chat, index) => (
                <li
                  className="my-2 d-flex justify-content-between cursor-pointer"
                  key={index}
                  onClick={() => {
                    setActiveChat(chat)
                  }}
                  style={{ backgroundColor:"transparent",borderRight:chat?.active ? "0.3rem solid var(--chat-bg-color)" : ""}}
                >
                  <div className="col-3 col-md-2 col-lg-3 m-0 d-flex align-items-center">
                    <div
                      className="bg-secondary rounded-5 position-relative"
                      style={{ width: "2.5em",height:"2.5em",border:"0.2rem solid var(--border-color)"}}
                    >
                      <img
                        src={
                          chat?.creator?.avatar
                            ? chat?.creator?.avatar
                            : require("../../assets/img/profile-anonim.png")
                        }
                        alt="profile"
                        className="w-100 h-100 rounded-5 object-fit-cover"
                      />
                      <div
                        className={`rounded-5 ${
                          chat?.admin?.is_online ? "d-block" : "d-none"
                        }`}
                        style={{
                          position: "absolute",
                          top: "0rem",
                          left: "0rem",
                          width: "0.8rem",
                          height: "0.8rem",
                          backgroundColor: "var(--online-green-color)",
                          border: "0.1rem solid var(--chat-bg-color-1)",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-6 d-flex flex-column p-1">
                    <div className="text-light fw-bolder text-uppercase">
                      {chat?.title}
                    </div>
                    <div
                      style={{ fontSize: "0.7rem", color: "rgb(160,160,160)" }}
                    >
                      {chat?.last_message?.text
                        ? chat?.last_message?.text?.length > 20
                          ? chat?.last_message?.text?.slice(0, 20) + "..."
                          : chat?.last_message?.text
                        : "message not available"}
                    </div>
                  </div>
                  <div className="col-2 d-flex flex-column justify-content-center p-0">
                    <div
                      className="mb-1 w-100 d-flex justify-content-center"
                      style={{ fontSize: "0.7rem", color: "rgb(160,160,160)" }}
                    >
                      {chat?.last_message?.created
                        ? timeAgo(chat?.last_message?.created)
                        : ""}
                    </div>
                  </div>
                </li>
              ))
           }
        </ul>
      </div>
      {/* add chat btn */}
      <div
        className="d-flex justify-content-end"
        style={{ height: "8%" }}
      >
        <button
          className="btn d-flex justify-content-center align-items-center"
          style={{
            width: "2.4rem",
            height: "2.4rem",
            backgroundColor: "var(--chat-btn-color)",
          }}
          onClick={() => dispatch(AddChatModal(true))}
        >
          <i 
            className="bi bi-plus-circle fs-4 d-flex justify-content-center align-items-center"
            style={{color:"var(--secondary-color)"}}
          ></i>
        </button>
      </div>
      {/* Modal */}
      {isAddChatModal ? <CreateChatModal /> : ""}
    </section>
  );
}
export default memo(ChatList)
