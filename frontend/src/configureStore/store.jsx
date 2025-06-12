import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../slices/userSlice"
import carReducer from "../slices/carslices"
import bookingReducer from "../slices/bookingSlices"
import paymentReducer from "../slices/paymentSlices"
import subscriptionsReducer from "../slices/subscriptionSlice"
import themeReducer from "../slices/ThemeSlice"
const carStore=configureStore({
    reducer:{
         user:userReducer,
         cars:carReducer,
         booking:bookingReducer,
         payment:paymentReducer,
         subscriptions: subscriptionsReducer,
         theme:themeReducer
    }
   
})
export default carStore