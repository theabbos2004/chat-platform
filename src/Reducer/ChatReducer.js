import { createSlice } from "@reduxjs/toolkit"

const initialState={
    chat:{},
    chats:[],
    socket:null,
    chatId:null,
    sendMessage:{},
    refresh:false,
    isChatList:false,
    isChatsettings:false,
    isAddChatModal:false,
    messageId:null,
}
const chatSlice=createSlice({
    initialState,
    name:"authStore",
    reducers:{
        socketReducer:(state,action)=>{
            state.socket=!action.payload
        },
        setChatRr:(state,action)=>{
            state.chat=action?.payload
        },
        setChatsRr:(state,action)=>{
            state.chats=action?.payload
        },
        setSendMessage:(state,action)=>{
            state.sendMessage=action?.payload
        },
        changeRefresh:(state,action)=>{
            state.refresh=action?.payload
        },
        isChatsettings:(state,action)=>{
            state.isChatsettings=action?.payload
        },
        AddChatModal:(state,action)=>{
            state.isAddChatModal=action?.payload
        },
        messageIdReducer:(state,action)=>{
            state.messageId=action?.payload
        },
        isChatListRr:(state,action)=>{
            state.isChatList=action?.payload
        },
    }
})
export const {setChatRr,setChatsRr,socketReducer,setChatId,setSendMessage,isChatListRr,isChatsettings,AddChatModal,messageIdReducer}=chatSlice.actions
export default chatSlice.reducer