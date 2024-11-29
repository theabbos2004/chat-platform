import React, { memo } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { useMainContext } from '../../../contexts/AuthContext'
import { useDeleteChat } from '../../../lib/react-query/queries'
import { isChatsettings, setChatRr } from '../../../Reducer/ChatReducer'

 function DeleteChatModal({setIsDeleteChatModal=()=>{}}) {
    const {chat}=useSelector(store=>store?.chatStore)
    const {setNotification}=useMainContext
    const {mutateAsync:deleteChat}=useDeleteChat()
    const dispatch=useDispatch()
    const deleteChatFunc=async()=>{
      try{
        const deleteChatRes=await deleteChat({chatId:chat?.$id})
        if(deleteChatRes?.error){
          throw new Error(deleteChatRes?.error)
        }
        setIsDeleteChatModal(false)
        dispatch(isChatsettings(false))
        dispatch(setChatRr(null))
      }
      catch(error){
        setNotification({type:"error",desc:`${error}`})
      }
    }

  return (
    <div 
      className={`modal d-flex justify-content-center align-items-center `} 
      style={{backgroundColor:"rgba(0,0,0,0.4)"}}
    >
      <div className="modal-dialog" style={{minWidth:"40%"}}>
        <div className="modal-content" style={{backgroundColor:"rgb(32,33,35)"}}>
          <div className="modal-header">
            <h5 className="modal-title text-light">Chat Delete</h5>
            <button type="button" className="btn-close" onClick={()=>setIsDeleteChatModal(false)}></button>
          </div>
          <div className="modal-body d-flex justify-content-center align-items-center" style={{padding:"3rem 0"}}>
            are you sure
          </div>
          <div className="modal-footer d-flex justify-content-between align-items-center">
            <button type="button" className="btn text-light" style={{backgroundColor:"var(--chat-bg-color)",border:"none"}} onClick={()=>setIsDeleteChatModal(false)}>Close</button>
            <button onClick={deleteChatFunc} type="submit" className="btn text-light bg-danger">Delete chat</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default memo(DeleteChatModal)