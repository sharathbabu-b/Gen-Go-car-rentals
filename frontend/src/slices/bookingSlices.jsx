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
export const createBooking=createAsyncThunk("booking/createBooking",async(bookingData,{rejectWithValue})=>{
    try{
        const response=await axios.post("/createBooking",bookingData)
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
        success:false,
        serverErr:null,
    },
    reducers:{}

})
export default bookingSlice.reducer
