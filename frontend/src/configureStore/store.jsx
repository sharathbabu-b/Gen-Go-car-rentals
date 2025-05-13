import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice"
const carStore=configureStore({
    reducer:{
         user:userReducer
    }
   
})
export default carStore