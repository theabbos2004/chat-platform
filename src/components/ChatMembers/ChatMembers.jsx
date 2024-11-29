import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "../shared/index";
import { useUpdateChat } from "../../lib/react-query/queries";
import { useMainContext } from "../../contexts/AuthContext";
function ChatMembers() {
  const {setNotification}=useMainContext()
  const {$id} = useSelector((store) => store?.authStore?.user);
  const {chat} = useSelector((store) => store?.chatStore);
  const {mutateAsync:updateChat}=useUpdateChat()

  const delUserToChat=async (user)=>{
    try{
      const newUser=chat?.users?.filter(chatUser=>chatUser?.$id!==user?.$id && chatUser)
      const updateChatRes=await updateChat({chatId:chat?.$id,data:{users:newUser}})
      if(updateChatRes.error){
        throw new Error(updateChatRes.error)
      }
    }
    catch(error){
      setNotification({type:"error",desc:`${error}`})
    }
  }

  return (
    <ul className="h-100 py-2 container text-light overflow-y-scroll col">
      {!chat ? (
        <li className="row">
          <Skeleton count={4} height="2.8rem" classNameBox="m-0 my-2" />
        </li>
      ) 
      : !chat.$id ? (
        <li
          className="row m-0 px-1 my-2 text-center d-flex justify-content-center align-content-center"
          style={{ height: "2.8rem" }}
        >
          group not selected
        </li>
      ) : chat?.users 
      ? chat?.users?.map((item, index) =>
        <li
            key={index}
            className="row m-0 my-2 py-3 rounded-3"
            style={{ backgroundColor: "var(--chat-btn-color)" }}
          >
            <div className="col-3 m-0 d-flex justify-content-center align-items-center">
              <div
                className="bg-secondary rounded-5 overflow-hidden position-relative"
                style={{ width: "2rem", height: "2rem" }}
              >
                <img
                  src={
                    item?.avatar
                      ? item?.avatar
                      : require("../../assets/img/profile-anonim.png")
                  }
                  alt="profile"
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
            </div>
            <div className="col-7 d-flex justify-content-between align-items-center">
              <div className="text-light text-capitalize">
                {item?.userName}
              </div>
            </div>
            <div className="col-2 d-flex justify-content-between align-items-center">
              {item?.request ? (
                <div
                  className="spinner-border row"
                  role="status"
                  style={{ width: "1.25rem", height: "1.25rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : chat?.creator?.$id === $id && item?.$id !== $id  ? (
                <i
                  className="row bi bi-dash-circle-fill fs-5 text-danger cursor-pointer"
                  onClick={async () => {
                    await delUserToChat(item)
                  }}
                ></i>
              ) : (
                ""
              )}
            </div>
          </li>
        )
      :(
        <li
          className="row m-0 px-1 my-2 text-center d-flex justify-content-center align-content-center"
          style={{ height: "2.8rem" }}
        >
          group members are not available
        </li>
      )
      }
    </ul>
  );
}
export default memo(ChatMembers)