import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";;
export const fetchCars=createAsyncThunk("cars/fetchCars",async()=>{
    try{
        const response=await axios.get("/getallcars")
        console.log(response.data)
        return response.data
    }catch(error){
        console.log(error)
    }
})
const carSlice=createSlice({
    name:"cars",
    initialState:{
        carsData:[],
        loading:false,
        serverErr:null,
        carsEditId:null

    },
    reducers:{
        assignEditId:(state,action)=>{
            state.carsEditId=action.payload
        }
    },
})
export const {assignEditId}=carSlice.actions
export default carSlice.reducer