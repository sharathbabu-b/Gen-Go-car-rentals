import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice"
import carReducer from "../slices/carslices"
import bookingReducer from "../slices/bookingSlices"
import subscriptionsReducer from "../slices/subscriptionSlice"
const carStore=configureStore({
    reducer:{
         user:userReducer,
         cars:carReducer,
         booking:bookingReducer,
         subscriptions: subscriptionsReducer,
    }
   
})
export default carStore