import { createSlice } from "@reduxjs/toolkit";
import { IPostThread, ThreadInterface } from "../../interface/IThread";

const initialThreadsState: { threads: ThreadInterface[] } = { threads: [] };

export const threadSlice = createSlice({
  name: "thread",
  initialState: initialThreadsState,
  reducers: {
    GET_THREADS: (state, action) => {
      state.threads = action.payload;
    },
    SET_THREAD_LIKE: (state, action: { payload: { id: number; isLiked: boolean } }) => {
      const { id, isLiked } = action.payload;
      const threads = state.threads.map((thread: ThreadInterface) => {
        if (thread.id === id) {
          return {
            ...thread,
            likes_count: isLiked ? thread.likes_count - 1 : thread.likes_count + 1,
            isLiked: !isLiked,
          };
        }
        return thread;
      });

      state.threads = threads;
    },
  },
});

const initialThreadPost: { data: IPostThread } = {
  data: {
    content: "",
    image: "",
  },
};

export const postThreadSlice = createSlice({
  name: "postThread",
  initialState: initialThreadPost,
  reducers: {
    POST_THREAD: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});
