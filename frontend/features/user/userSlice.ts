import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  name: string;
};

const initialState: InitialState = {
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload;
    },
  },
});

const { actions } = userSlice;
export const { setUser } = actions;
export default userSlice.reducer;
