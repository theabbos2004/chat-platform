import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateMesagge, useUpdateChatMessage } from "../../lib/react-query/queries";
import { useMainContext } from "../../contexts/AuthContext";
import { messageIdReducer } from "../../Reducer/ChatReducer";
function SendChat() {
  const {user} = useSelector((store) => store?.authStore);
  const {chat,messageId} = useSelector((store) => store?.chatStore);
  const {setNotification}=useMainContext()
  const [message, SetMessage] = useState();
  const dispatch = useDispatch();
  const {mutateAsync:createMesagge,isLoading:messageIsLoading}=useCreateMesagge()
  const {mutateAsync:updateChatMessage}=useUpdateChatMessage()
  useEffect(() => {
    if ( user && messageId?.messageId) {
        SetMessage(messageId?.text)
    }
  }, [messageId,user]);


  const updateMessageFunc = async (message) => {
    try{
      const updateChatMessageRes=await updateChatMessage({messageId:messageId?.messageId,text:message})
      if(updateChatMessageRes.error){
        throw new Error(updateChatMessageRes.error)
      }
      dispatch(messageIdReducer(null));
      SetMessage()
    }
    catch(error){
      setNotification({type:"error",desc:`${error}`})
    }
  };

  const createMesaggeFunc=async (text)=>{
    try{
      const createMesaggeRes=await createMesagge({creator:user, chat:chat , text})
      if(createMesaggeRes.error){
        throw new Error(createMesaggeRes.error)
      }
      SetMessage("")
    }
    catch(error){
      setNotification({type:"error",desc:`${error}`})
    }
  }
  return (
    <div
      className={`px-0 container d-flex justify-content-center align-items-center`}
      style={{ height: "8%" ,background:"var(--show-chat-color)"}}
    >
      <form
        className="rounded p-2 d-flex align-items-center"
        style={{
          width: "90%",
          height: "2.4rem",
          backgroundColor: "var(--chat-btn-color)",
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          const message = e.target[0].value;
          if (message && chat && user && messageId?.messageId) {
            await updateMessageFunc(message)
          }
          else if(message && chat && user){
            createMesaggeFunc(message)
          }
        }}
      >
        <input
          type="text"
          id="message_id"
          name="message"
          className="bg-transparent border-0"
          readOnly={!chat?.$id && true}
          style={{
            outline: "none",
            width: "95%",
            color: "var(--secondary-color)",
          }}
          placeholder="Write a message..."
          value={message ? message : ""}
          onChange={(e) => SetMessage(e.target.value)}
        />
        <button
          className="d-flex justify-content-center align-content-center bg-transparent"
          type="submit"
          style={{ width: "5%", outline: "none", border: "none" }}
          disabled={messageIsLoading}
        >
          <i
            className="bi bi-send-fill fs-5"
            style={{ color: "var(--secondary-color)" }}
          ></i>
        </button>
      </form>
    </div>
  );
}
export default memo(SendChat)
