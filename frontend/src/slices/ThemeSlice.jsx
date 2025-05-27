// src/slices/ThemeSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("theme") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions; // ✅ export the action
export default themeSlice.reducer; // ✅ default export the reducer
