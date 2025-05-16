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
export const createCars=createAsyncThunk("cars/createCars",async({formData,resetForm},{rejectWithValue})=>{
    try{
        const response=await axios.post("/addCar",formData,{headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
        resetForm()
        return response.data
    }catch(error){
        console.log(error)
        return rejectWithValue({
            message:error?.message|| "something went wrong",
            errors:error.response.data.errors
        })
    }
    

})
export const updateCars=createAsyncThunk("cars/updateCars",async({carsObj,resetForm},{rejectWithValue})=>{
    try{
        console.log(carsObj._id)
        const response=await axios.put(`/updateCar/${carsObj._id}`,carsObj,{headers:{Authorization:localStorage.getItem("token")}})
        resetForm()
        console.log(response.data)
        return response.data
    }catch(error){
        console.log(error)
        return rejectWithValue({
            message:error.message,
            errors:error.response.data.errors
        })
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
    extraReducers:(builder)=>{
        builder.addCase(fetchCars.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchCars.fulfilled,(state,action)=>{
            state.carsData=action.payload
            state.loading=false
        })
        builder.addCase(fetchCars.rejected,(state,action)=>{
            state.loading=false
            state.serverErr="Something went wrong"
        })
    
    }
})
export const {assignEditId}=carSlice.actions
export default carSlice.reducer