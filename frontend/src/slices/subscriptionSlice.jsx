// src/redux/slices/subscriptionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../axios/axios"

 // Adjust this based on your backend routes

// Thunks
export const fetchSubscriptions = createAsyncThunk('subscriptions/fetchSubscriptions',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.get("subscriptionsGetall")
    }catch(error){
        console.log(error)
        return rejectWithValue({
            message:"Something went wrong ",
            error:error.response.data.errors
        })
    }
})
   


export const createSubscription = createAsyncThunk('subscriptions/create', async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
});

export const updateSubscription = createAsyncThunk('subscriptions/update', async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
});

export const deleteSubscription = createAsyncThunk('subscriptions/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Slice
const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    subscriptions: [],
    loading: false,
    error: null,
    editId:null,
  },
  reducers: {
    EditId:(state,action)=>{
            console.log(action.payload)
            state.editId=action.payload
    
  }
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createSubscription.fulfilled, (state, action) => {
        state.subscriptions.push(action.payload);
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        const index = state.subscriptions.findIndex(sub => sub._id === action.payload._id);
        if (index !== -1) state.subscriptions[index] = action.payload;
      })
      .addCase(deleteSubscription.fulfilled, (state, action) => {
        state.subscriptions = state.subscriptions.filter(sub => sub._id !== action.payload);
      });
  },
});

export default subscriptionsSlice.reducer;
