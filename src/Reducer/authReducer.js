import { createSlice } from "@reduxjs/toolkit"

const initialState={
    user:{},
    users:[]
}
const authSlice=createSlice({
    initialState,
    name:"authStore",
    reducers:{
        userReducer:(state,action)=>{
            state.user=action?.payload
        },
        usersReducer:(state,action)=>{
            state.users=action?.payload
        }
    }
})
export const {userReducer,usersReducer}=authSlice.actions
export default authSlice.reducer