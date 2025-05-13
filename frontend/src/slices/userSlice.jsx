import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../axios/axios"
export const fetchUserAccount=createAsyncThunk("user/fetchUserAccount",async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get("/account",{headers:{Authorization:localStorage.getItem('token')}})
        return response.data
    }catch(error){
        console.log(error)
        return rejectWithValue({
            message:"something went wrong",
             error:error.response.data.errors
        
        })
    }
})
export const updateUserAccount=createAsyncThunk("user/updateUserAccount",async(id,{rejectWithValue})=>{
    try{
        const response=await axios.put(`/updateuseraccount/${id}`,{headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
        return response.data
    }catch(error){
        console.log(resposne.data)
        return rejectWithValue({
            messaage:"Something went wrong",
            error:error.response.data.errors
        })
    }
})
export const forgotPassword=createAsyncThunk("user/forgotPassword",async(email,{rejectWithValue})=>{
    try{
        const response=await axios.post(`/reset-password/${token}`,{email})
        return response.data
    }catch(error){
        return rejectWithValue({
            messaage:"something went wrong"
        })
    }
})
const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,isLoggedIn:false,serverErr:null,editId:null,users:[]
    },
    reducers:{
        login:(state,action)=>{
            state.data=action.payload
            state.isLoggedIn=true
        },
        logout:(state)=>{
            state.data=null
            state.isLoggedIn=false
        },
        userEditId:(state,action)=>{
            state.editId=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUserAccount.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchUserAccount.fulfilled,(state,action)=>{
            state.userData=action.payload
            state.isLoggedIn=true
            state.loading=false
        })
        builder.addCase(fetchUserAccount.rejected,(state,action)=>{
            state.serverErr=action.payload
             state.isLoggedIn=false
            state.userData=null
        })
        builder.addCase()
    }
})
export const{login,logout}=userSlice.actions
export default userSlice.reducer