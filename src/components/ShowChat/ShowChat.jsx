import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddChatModal, messageIdReducer } from "../../Reducer/ChatReducer";
import {useDeleteChatMessage} from "../../lib/react-query/queries"
import { timeAgo } from "../../Hook/timeAgo";
import style from "./index.module.scss";
import { useMainContext } from "../../contexts/AuthContext";

function ShowChat() {
  const { chat } = useSelector((store) => store?.chatStore);
  const { user } = useSelector((store) => store?.authStore);
  const {setNotification}=useMainContext()
  const [chatDetails, setChatDetails] = useState();
  const {mutateAsync:deleteChatMessage}= useDeleteChatMessage()
  const dispatch = useDispatch();
  const showChatRef = useRef();
  useEffect(() => {
    chat ? setChatDetails(chat) : setChatDetails({})
  }, [chat]);
  
  useEffect(() => {
    chatDetails && showChatRef.current.scrollTo(0, showChatRef.current.scrollHeight)
  }, [chatDetails]);

  const messageEvent = ({ $id, event }) => {
    setChatDetails((state) => {
      const messages= state?.messages?.map((message) => {
        if ($id === message?.$id) {
          return { ...message, event };
        } else {
          return { ...message, event: false };
        }
      });
      return {...state,messages}
    });
  };
  const deleteChatMessageFunc = async (message) => {
    try{
      const deleteChatMessageRes=await deleteChatMessage({messageId:message?.$id})
      if(deleteChatMessageRes.error){
        throw new Error(deleteChatMessageRes.error)
      }
    }
    catch(error){
      setNotification({type:"error",desc:`${error}`})
    }
  };
  return (
    <div
      className="py-1 px-0 text-light w-100 position-relative"
      style={{ height: "84%", background: "var(--show-chat-color)" }}
    >
      <ul
        className="p-0 m-1 m-0 h-100"
        style={{ width: "calc(100% - 0.2rem)", overflowY: "scroll" }}
        ref={showChatRef}
      >
        {!chatDetails ? (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border m-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) :
        !chatDetails?.$id ? (
          <li className="w-100 h-100 d-flex align-items-center justify-content-center">
            <button
              className="card  shadow text-light py-4 text-uppercase rounded-3 d-flex align-items-center justify-content-center"
              style={{ width: "50%", backgroundColor: "var(--chat-bg-color)" }}
              onClick={() => dispatch(AddChatModal(true))}
            >
              <p className="m-0">Create chat</p>
            </button>
          </li>
        ) : (
          chatDetails?.messages?.map((message, index) =>
            message?.creator?.$id === user?.$id ? (
              <li className="my-3 row m-0 gap-1" key={index}
                onMouseLeave={()=>{
                  messageEvent({ $id: message?.$id, event: false });
                }}
              >
                <div className="col-3 col-lg-5 d-flex justify-content-end">
                  {message?.event && 
                    <div
                      className={`${style.message__event} rounded-2 py-1 px-2  d-flex flex-column justify-content-center align-messages-center text-light`}
                      style={{ backgroundColor: "var(--chat-bg-color-1)" }}
                    >
                      <button
                        className="my-1"
                        onClick={() => {
                          messageEvent({ $id: message?.$id, event: false });
                          dispatch(messageIdReducer({messageId:message?.$id,text:message?.text}));
                        }}
                      >
                        <i className="bi bi-pen fs-6"></i>
                      </button>
                      <button
                        className="my-1"
                        onClick={async () => {
                          messageEvent({ $id: message?.$id, event: false });
                          await deleteChatMessageFunc(message)
                        }}
                      >
                        <i className="bi bi-trash3 fs-6"></i>
                      </button>
                    </div>
                  }
                </div>
                <div className="col-9 col-lg-7 row cursor-pointer p-0">
                  <div
                    className="card border-0 rounded-3  col-9 col-md-10 px-3 py-2"
                    style={{ backgroundColor: "var(--chat-bg-color)" }}
                    onClick={() =>
                      messageEvent({  $id: message?.$id, event: true })
                    }
                  >
                    <div className="d-flex justify-content-between align-messages-center">
                      <div
                        className="fw-semibold text-capitalize"
                        style={{ color: "var(--blue-color)" }}
                      >
                        {message?.creator?.userName}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--secondary-color)",
                        }}
                      >
                        {timeAgo(message?.$createdAt)}
                      </div>
                    </div>
                    <div className="text-white">{message?.text}</div>
                  </div>
                  <div className="col-3 col-md-2 m-0 d-flex justify-content-center align-messages-end p-0">
                    <div
                      className="rounded-5 overflow-hidden position-relative"
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        border: "0.2rem solid var(--border-color)",
                      }}
                    >
                      <img
                        src={
                          message?.sender?.avatar
                            ? message?.sender?.avatar
                            : require("../../assets/img/profile-anonim.png")
                        }
                        alt="profile"
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </div>
                </div>
              </li>
            ) : (
              <li className="my-3 row m-0" key={index}>
                <div className="col-9 col-lg-7 row">
                  <div className="col-3 col-md-2 m-0 px-1 d-flex justify-content-center align-messages-end">
                    <div
                      className="rounded-5 overflow-hidden position-relative"
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        border: "0.2rem solid var(--border-color)",
                      }}
                    >
                      <img
                        src={
                          message?.creator?.avatar
                            ? message?.creator?.avatar
                            : require("../../assets/img/profile-anonim.png")
                        }
                        alt="profile"
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </div>
                  <div
                    className="card border-0 rounded-3 col-9 col-md-10 py-2"
                    style={{ backgroundColor: "var(--chat-bg-color-1)" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div
                        className="fw-semibold text-capitalize"
                        style={{ color: "var(--blue-color)" }}
                      >
                        {message?.creator
                          ? message?.creator?.userName
                          : "deleted account"}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--secondary-color)",
                        }}
                      >
                        {timeAgo(message?.$createdAt)}
                      </div>
                    </div>
                    <div className="text-white">{message?.text}</div>
                  </div>
                </div>
                <div className="col-3 col-lg-5"></div>
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
}

export default memo(ShowChat);
