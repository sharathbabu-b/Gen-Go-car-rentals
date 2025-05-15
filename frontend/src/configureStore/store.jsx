import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice"
import carReducer from "../slices/carslices"
import subscriptionsReducer from "../slices/subscriptionSlice"
const carStore=configureStore({
    reducer:{
         user:userReducer,
         cars:carReducer,
         subscriptions: subscriptionsReducer,
    }
   
})
export default carStore