import { configureStore } from "@reduxjs/toolkit";
import {ChatReducer, authReducer} from "../Reducer/index";


const store=configureStore({
    reducer:{
        authStore:authReducer,
        chatStore:ChatReducer
    }
})
export default store