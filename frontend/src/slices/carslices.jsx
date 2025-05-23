import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";
;
export const fetchAllCars=createAsyncThunk("cars/fetchAllCars",async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get("/getallcars")
        console.log(response.data)
        return response.data
    }catch(error){
        console.log(error)
        return rejectWithValue({
            message:error?.message|| "something went wrong",
             errors:error?.response.data.errors
        })
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
export const deleteCars=createAsyncThunk("cars/deleteCars",async(id,{rejectWithValue})=>{
    try{
        console.log(id)
        const response=await axios.delete(`/deleteCar/${id}`,{headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
        return response.data.deleteCar
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
        builder.addCase(fetchAllCars.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchAllCars.fulfilled,(state,action)=>{
            state.carsData=action.payload
            state.loading=false
        })
        builder.addCase(fetchAllCars.rejected,(state,action)=>{
            state.loading=false
            state.serverErr="Something went wrong"
        })
        builder.addCase(createCars.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(createCars.fulfilled,(state,action)=>{
            state.carsData.push(action.payload)
        })
        builder.addCase(updateCars.pending,(state)=>{
            state.loading=true
            state.serverErr = null;
        })
        builder.addCase(updateCars.fulfilled,(state,action)=>{
            const index=state.carsData.findIndex(ele=>ele._id===action.payload._id)
            state.data[index]=action.payload
            state.carsEditId=null
            state.serverErr=null
        })
        builder.addCase(updateCars.rejected,(state,action)=>{
             state.loading = false;
            state.serverErr=action.payload
        })
        builder.addCase(deleteCars.pending,(state)=>{
            state.loading=true
            state.serverErr = null;
        })
        builder.addCase(deleteCars.fulfilled,(state,action)=>{
            const index=state.carsData.findIndex(ele=>ele._id===action.payload._id)
            state.carsData.splice(index,1)
        })
        builder.addCase(deleteCars.rejected,(state,action)=>{
            state.serverErr = null;
            state.serverErr = action.payload
        })


    
    }
})
export const {assignEditId}=carSlice.actions
export default carSlice.reducer