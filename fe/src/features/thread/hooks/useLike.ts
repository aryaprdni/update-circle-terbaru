/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../libs/axios";
import { RootState } from "../../../store/types/RootState";
import { SET_THREAD_LIKE } from "../../../store/RootReducer";

export function useLike() {
  const dispatch = useDispatch();
  const threads = useSelector((state: RootState) => state.thread.threads);

  async function handleLike(id: number, isLiked: boolean) {
    try {
      if (!isLiked) {
        await API.post("/like", { threadsId: id });
      } else {
        await API.delete(`/like/${id}`);
        // console.log("Berhasil menghapus like", response.data);
      }
      dispatch(SET_THREAD_LIKE({ id: id, isLiked: isLiked }));
    } catch (error) {
      console.error("Error handling like:", error);
      throw error;
    }
  }

  return {
    threads,
    handleLike,
  };
}
