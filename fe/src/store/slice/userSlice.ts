import { createSlice } from "@reduxjs/toolkit";
import { IUserSearch } from "../../interface/IAuth";

const initialUsersState: { users: IUserSearch[] } = { users: [] };

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {
    GET_USERS: (state, action) => {
      state.users = action.payload || [];
      // console.log("action", action);
    },
  },
});
