import React, { memo } from 'react'
import {Header, SendChat, ShowChat} from "../index"
function Message({className}) {
  return (
    <div 
      className={`h-100 px-0 ${className}`}
      >
      <Header/>
      <ShowChat/>
      <SendChat/>
    </div>
  )
}
export default memo(Message)