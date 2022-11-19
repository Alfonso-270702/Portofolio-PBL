import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userLoginAsync = createAsyncThunk(
  "user/userLoginAsync",
  async (payload) => {
    try {
      const user = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (user.ok) {
        const userDetail = await user.json();
        localStorage.setItem("token", userDetail.token);
        return { userDetail };
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const userRegisterAsync = createAsyncThunk(
  "user/userRegisterAsync",
  async (payload) => {
    try {
      const user = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (user.ok) {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const user = createSlice({
  name: "user",
  initialState: [],
  reducers: {},
  extraReducers: {
    [userLoginAsync.fulfilled]: (state, action) => {
      const users = action.payload;
      return users;
    },
  },
});

export default user.reducer;
