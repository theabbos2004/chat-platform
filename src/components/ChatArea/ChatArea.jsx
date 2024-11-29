import React, { memo} from 'react'
import {  useSelector } from 'react-redux'
import { ChatList, ChatSetting, Message } from "../index"

function ChatArea() {

  const isChatsettings=useSelector(store=>store?.chatStore?.isChatsettings)
  const isChatList=useSelector(store=>store?.chatStore?.isChatList)
  

  return (
    <div className='vh-100 row m-0 overflow-hidden'>
        <ChatList className={`${isChatList?"col-12":"d-none"} ${isChatsettings?"d-sm-none":"col-sm-4"} d-sm-block col-sm-5 col-lg-3`}/>
        <Message className={`${isChatList?"d-none":"col-12"} ${isChatsettings?"d-none col-md-7 d-md-block":"col-12"} col-sm-7 col-lg-6`}/>
        <ChatSetting className={`${isChatsettings?"col-12 col-sm-12 d-sm-block col-md-5":"d-none"} col-lg-3 d-lg-block `}/>
    </div>
  )
}
export default memo(ChatArea)