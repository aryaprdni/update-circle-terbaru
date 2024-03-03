import { createSlice } from "@reduxjs/toolkit";
import { IFollow } from "./../../interface/IFollow";

const initialFollowState: { followState: string; follows: IFollow[] } = {
  followState: "followers",
  follows: [],
};

export const followSlice = createSlice({
  name: "follow",
  initialState: initialFollowState,
  reducers: {
    GET_FOLLOWS: (state, action) => {
      state.follows = action.payload;
    },
    SET_FOLLOW_STATE: (state, action) => {
      state.followState = action.payload;
    },
    SET_FOLLOW: (state, action: { payload: { id: number; is_following: boolean } }) => {
      const { id, is_following } = action.payload;

      state.follows = state.follows.map((follow) => {
        if (follow.id === id) {
          return {
            ...follow,
            isFollowed: !is_following,
          };
        }

        return follow;
      });
    },
  },
});
