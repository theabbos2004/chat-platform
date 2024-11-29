import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { ChatEvent, ChatMembers, Members } from "../index";
import { isChatsettings } from "../../Reducer/ChatReducer";
function ChatSetting({ className }) {
  const dispatch = useDispatch();
  const [menu, SetMenu] = useState([
    {
      id: 1,
      active: true,
      title: "chat members",
      icon: "bi-people-fill",
      element: (index) => <ChatMembers key={index} />,
    },
    {
      id: 2,
      active: false,
      title: "members",
      icon: "bi-person-fill-add",
      element: (index) => <Members key={index} />,
    },
    {
      id: 3,
      active: false,
      title: "members",
      icon: "bi-box-arrow-right",
      element: (index) => <ChatEvent key={index} />,
    },
  ]);

  return (
    <div
      className={`h-100 px-0 text-light ${className}`}
      style={{ borderLeft: "0.2rem solid var(--border-color)" }}
      onMouseLeave={() => dispatch(isChatsettings(false))}
    >
      <div
        className="row m-0 pt-1"
        style={{
          height: "8%",
          borderBottom: "0.2rem solid var(--border-color)",
        }}
      >
        <div
          className="col d-flex flex-column justify-content-center align-items-center"
          onClick={() => dispatch(isChatsettings(false))}
        >
          <div 
            className="fw-bolder d-none d-lg-block"
            style={{color:"var(--secondary-color)"}}
          >
            Group
          </div>
          <i className="bi bi-x fw-bold text-light fs-3 d-block d-lg-none cursor-pointer"></i>
        </div>
        {menu.map((item, index) => (
          <div
            key={index}
            className="h-100 col d-flex flex-column cursor-pointer justify-content-center align-items-center rounded-top-3"
            style={{
              backgroundColor: item?.active ? "rgba(255, 255, 255, 0.41)" : "",
            }}
            onClick={() =>
              SetMenu((state) =>
                state?.map((el) => {
                  if (el.id === item?.id) {
                    return { ...el, active: true };
                  } else {
                    return { ...el, active: false };
                  }
                })
              )
            }
          >
            <i className={`bi fs-5 ${item?.icon} p-0 m-0`}></i>
          </div>
        ))}
      </div>
      <div style={{ height: "92%" }}>
        {menu.map((item, index) => item?.active && item?.element(index))}
      </div>
    </div>
  );
}
export default memo(ChatSetting)