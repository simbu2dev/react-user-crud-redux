import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: []
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const { index, data } = action.payload;
      state.users[index] = data;
    }
  }
});

export const { addUser, updateUser } = userSlice.actions;
export default userSlice.reducer;