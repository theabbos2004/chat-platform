import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  isChatListRr, isChatsettings } from "../../Reducer/ChatReducer";
import ThemeSwitch from "../shared/ThemeSwitch/ThemeSwitch";

function Header() {
  const {chat} = useSelector((store) => store?.chatStore);
  const dispatch = useDispatch();
  
  return (
    <header
      className="py-1 d-flex justify-content-between align-items-center container"
      style={{
        height: "8%",
        borderBottom: "0.2rem solid var(--border-color)",
      }}
    >
      <div className="d-flex flex-column text-light">
        <div className="fw-bold text-capitalize m-0">
          {chat ? chat?.title : "chat is not selected"}
        </div>
        <div
          className="m-0"
          style={{ fontSize: "0.7rem", color: "var(--secondary-color)" }}
        >
          {chat ? chat?.users?.length : 0} members
        </div>
      </div>
      <div className="d-flex gap-3">
        <ThemeSwitch/>
        <div
          className="d-sm-none cursor-pointer"
          onClick={() => {
            dispatch(isChatListRr(true));
          }}
        >
          <i className="bi bi-chat-left text-light fs-5"></i>
        </div>
        <div
          className={`d-lg-none cursor-pointer ${!chat?.$id && "d-none"}`}
          onClick={() => {
            dispatch(isChatsettings(true));
          }}
        >
          <i className="bi bi-gear text-light fs-5"></i>
        </div>
      </div>
    </header>
  );
}
export default memo(Header)