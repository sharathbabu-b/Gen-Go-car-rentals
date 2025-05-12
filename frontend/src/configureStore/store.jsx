import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice"
const carStore=configureStore({
    user:userReducer
})
export default configureStore