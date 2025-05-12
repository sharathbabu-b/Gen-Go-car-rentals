import {createSlice,} from "@reduxjs/toolkit"
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
        }
    }
})
export const{login,logout}=userSlice.actions
export default userSlice.reducer