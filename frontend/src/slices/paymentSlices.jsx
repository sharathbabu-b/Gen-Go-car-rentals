import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../axios/axios"
import { act } from "react"
export  const fetchPayments=createAsyncThunk("payment/fetchPayments",async(_, { rejectWithValue })=>{
    try{

         const response=await axios.get("/payments",{headers:{Authorization:localStorage.getItem("token")}})
         console.log(response.data)
         return response.data
    }catch(error){
        console.log(error)
        return rejectWithValue({
            error:error.response?.data|| 'server error'
        })
    }
   
})
const paymentSlice=createSlice({
    name:"payment",
    initialState:{
        paymentlist:[],
        loading:false,
        serverErr:null
    },
    extraReducers:(builder)=>{
        builder.addCase( fetchPayments.pending,(state)=>{
            state.loading=true
            state.serverErr=null
        })
        builder.addCase(fetchPayments.fulfilled,(state,action)=>{
            state.loading=false
            state.paymentlist=action.payload
        })
        builder.addCase(fetchPayments.rejected,(state,action)=>{
            state.loading=false
            state.serverErr=action.payload
        })
    }
})
export default paymentSlice.reducer
