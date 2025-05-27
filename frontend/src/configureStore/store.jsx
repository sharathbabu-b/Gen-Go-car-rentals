import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice"
import carReducer from "../slices/carslices"
import bookingReducer from "../slices/bookingSlices"
import subscriptionsReducer from "../slices/subscriptionSlice"
import themeReducer from "../slices/ThemeSlice"
const carStore=configureStore({
    reducer:{
         user:userReducer,
         cars:carReducer,
         booking:bookingReducer,
         subscriptions: subscriptionsReducer,
         theme:themeReducer
    }
   
})
export default carStore