import { createSlice } from "@reduxjs/toolkit";
import { IReplies } from "../../interface/IReplies";

const initialRepliesState: { replies: IReplies[] } = { replies: [] };

export const repliesSlice = createSlice({
  name: "replies",
  initialState: initialRepliesState,
  reducers: {
    GET_REPLIES: (state, action) => {
      state.replies = action.payload;
      // console.log("action", action);
    },
  },
});
