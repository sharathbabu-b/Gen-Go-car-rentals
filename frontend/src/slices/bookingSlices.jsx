import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../axios/axios"
export const fetchbookingUser=createAsyncThunk("booking/fetchbookingUser",async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get("/getallbooking")
        console.log(response.data)
        return response.data
    }catch(error){
        console.log(error)
        return rejectWithValue({
            message:error?.messaage||"something went wrong",
             errors:error.response.data.errors
        })
    }
})
export const createBooking=createAsyncThunk("/createBooking",async(bookingData,{rejectWithValue})=>{
    try{
        const response=await axios.post("/createBooking",bookingData,{headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
        return response.data
    }catch(error){
        console.log(error)
        return rejectWithValue({
            message:error?.message|| "Something went wrong",
            errors:error?.response.data.errors
        })
    }
})
export const deleteBooking=createAsyncThunk("booking/deletedBooking",async(id,{rejectWithValue})=>{
    try{
        const response=await axios.delete(`/deleteBooking/${id}`)
    }catch(error){
        console.log(error)
        return rejectWithValue({
            message:error?.messaage||"deletd failed",
            errors:error?.response.data.errors

        })
    }
})
const bookingSlice=createSlice({
    name:"booking",
    initialState:{
        bookingData:[],
        loading:false,
        serverErr:null,
        bookingsEditId:null
    },
    reducers:{
        carbookingeditId:(state,action)=>{
            state.bookingsEditId=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchbookingUser.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchbookingUser.fulfilled,(state,action)=>{
            state.bookingData=action.payload
            state.loading=false
        })
        builder.addCase(fetchbookingUser.rejected,(state,action)=>{
            state.loading=false
             state.serverErr="Something went wrong"
        })
        builder.addCase(createBooking.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(createBooking.fulfilled,(state,action)=>{
            state.bookingData.push(action.payload)
        })
        builder.addCase(createBooking.rejected,(state,action)=>{
            state.loading=false
            state.serverErr="something went wrong "
        })
        

    }


})
export const {carbookingeditId} =bookingSlice.actions
export default bookingSlice.reducer
