import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteChatModal } from "../shared/index";
import { useUpdateChat } from "../../lib/react-query/queries";
import { useMainContext } from "../../contexts/AuthContext";
import { isChatsettings, setChatRr } from "../../Reducer/ChatReducer";

function ChatEvent() {
  const {$id} = useSelector((store) => store?.authStore?.user);
  const {chat} = useSelector((store) => store?.chatStore);
  const [isDeleteChatModal, SetIsDeleteChatModal] = useState();
  const {mutateAsync:updateChat}=useUpdateChat()
  const {setNotification}=useMainContext()
  const dispatch=useDispatch()

  const delUserToChat=async ()=>{
    try{
      const newUser=chat?.users?.filter(chatUser=>chatUser?.$id!==$id && chatUser)
      const updateChatRes=await updateChat({chatId:chat?.$id,data:{users:newUser}})
      if(updateChatRes.error){
        throw new Error(updateChatRes.error)
      }
      dispatch(isChatsettings(false))
      dispatch(setChatRr(null))
    }
    catch(error){
      setNotification({type:"error",desc:`${error}`})
    }
  }

  return (
    <ul className="h-100 py-2 col container text-light overflow-y-scroll">
      {
      !chat?.$id ? (
        <li
          className="row m-0 px-1 my-2 text-center d-flex justify-content-center align-content-center"
          style={{ height: "2.8rem" }}
        >
          group not selected
        </li>
      ) 
      :
      <>
            <li
              className={`row m-0 my-2 py-3 px-2 rounded-3`}
              style={{ backgroundColor: "var(--chat-btn-color)" }}
            >
              <div className="col-10 d-flex align-items-center">
                <div className="text-danger text-capitalize">Log out Chat</div>
              </div>
              <div className="col-2 d-flex justify-content-end align-items-center">
                {!true ? (
                  <div
                    className="spinner-border row"
                    role="status"
                    style={{ width: "1.25rem", height: "1.25rem" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <i
                    className={` bi bi-box-arrow-right fs-5 text-danger cursor-pointer`}
                    onClick={delUserToChat}
                  ></i>
                )}
              </div>
            </li>
            <li
              className={`row m-0 my-2 py-3 px-2 rounded-3 ${$id !== chat?.creator?.$id && "d-none "}}`}
              style={{ backgroundColor: "var(--chat-btn-color)" }}
            >
              <div className="col-10 d-flex align-items-center">
                <div className="text-danger text-capitalize">Delete Chat</div>
              </div>
              <div className="col-2 d-flex justify-content-end align-items-center">
                {!true ? (
                  <div
                    className="spinner-border row"
                    role="status"
                    style={{ width: "1.25rem", height: "1.25rem" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <i
                    className={` bi bi-archive-fill fs-5 text-danger cursor-pointer`}
                    onClick={()=>SetIsDeleteChatModal(true)}
                  ></i>
                )}
              </div>
            </li>
      </>
      }
      {isDeleteChatModal && (
        <DeleteChatModal setIsDeleteChatModal={SetIsDeleteChatModal} />
      )}
    </ul>
  );
}
export default memo(ChatEvent)