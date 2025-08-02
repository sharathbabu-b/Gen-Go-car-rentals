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
             error:error.response?.data?.errors || error.message,
        
        })
    }
})
export const fetchAllUsers=createAsyncThunk("user/fetchAllUsers",async(_,{rejectWithValue})=>{
    try{
        const response =await axios.get("/allusers",{headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
        return response.data
    }catch(error){
        console.log(error)
        return rejectWithValue({
            message:"Something went wrong",
            error:error.response?.data?.errors || error.message,
        })

    }
})
export const updateUserAccount=createAsyncThunk("user/updateUserAccount",async({id,formData},{rejectWithValue})=>{
    try{
        const response=await axios.put(`/updateuseraccount/${id}`,formData,{headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
        return response.data
    }catch(error){
        console.log(resposne.data)
        return rejectWithValue({
            messaage:"Something went wrong",
            error:error.response?.data?.errors || error.message,
        })
    }
})
export const removeUser=createAsyncThunk("user/removeUser",async(id,{rejectWithValue})=>{
    try{
        const response=await axios.delete(`/removeaccountuser/${id}`,{headers:{Authorization:localStorage.getItem("token")}})
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue({
            message:"something went wrong"
        })
    }
})
export  const approveUser=createAsyncThunk("user/approveUser",async(id,{rejectWithValue})=>{
    try{
        const response=await axios.put(`/approveUser/${id}`,{},{headers:{Authorization:localStorage.getItem("token")}})
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
export const rejectUser=createAsyncThunk("user/rejectUser",async(id,{rejectWithValue})=>{
    try{
        const response=await axios.put(`rejectuser/${id}`,{headers:{Authorization:localStorage.getItem("token")}})
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
export const activateUser=createAsyncThunk('user/activateUser',async(id,{rejectWithValue})=>{
    try{
        const response=await axios.put(`/activation/${id}`,{isActive:'true'},{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue({
            message:'Something went wrong'
        })
    }
})
export const InactivateUser=createAsyncThunk('user/InactivateUser',async(id,{rejectWithValue})=>{
    try{
        const response=await axios.put(`/activation/${id}`,{isActive:'false'},{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        return rejectWithValue({
            message:'Something went wrong'
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
export 
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
            console.log(action.payload)
            state.editId=action.payload
        }
    },
    extraReducers:(builder)=>{
  builder.addCase(fetchUserAccount.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchUserAccount.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
    })
   builder .addCase(fetchUserAccount.rejected, (state, action) => {
      state.serverErr = action.payload;
      state.isLoggedIn = false;
      state.userData = null;
    });
     builder.addCase(fetchAllUsers.fulfilled,(state,action)=>{
            state.users=action.payload
            state.isLoggedIn=true
        })
        builder.addCase(fetchAllUsers.rejected,(state,action)=>{
            state.serverErr=action.payload
        })
        builder.addCase(removeUser.fulfilled,(state,action)=>{
            const index=state.userData.findIndex((ele)=>ele._id===action.payload)
            state.userData.splice(index,1)
            state.isLoggedIn=true
        })
        builder.addCase(removeUser.rejected,(state,action)=>{
            state.serverErr=action.payload
        })
        // builder.addCase(updateUserAccount.fulfilled,(state,action)=>{
        //     const index=state.userData.findIndex((ele)=>ele._id===action.payload._id)
        //     state.userData[index]=action.payload
        //     state.isLoggedIn=true
        // })
        builder.addCase(updateUserAccount.fulfilled, (state, action) => {
    state.userData = action.payload;
    state.isLoggedIn = true;
});
        // builder.addCase(updateUserAccount.rejected,(state,action)=>{
        //             state.serverErr=action.payload
        // })
    }
})
export const{login,logout}=userSlice.actions
export default userSlice.reducer