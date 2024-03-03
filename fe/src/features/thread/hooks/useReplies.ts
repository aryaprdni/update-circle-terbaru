import { useParams } from "react-router-dom";
import { API, setAuthToken } from "../../../libs/axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IReplyThread, ThreadInterface } from "../../../interface/IThread";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootState";
import { GET_REPLIES } from "../../../store/RootReducer";
import React from "react";

export function useReplies() {
  setAuthToken(localStorage.token);
  const dispatch = useDispatch();
  const replies = useSelector((state: RootState) => state.replies);
  const { id } = useParams();
  const [threadDetail, setThreadDetail] = useState<ThreadInterface>();

  // GET THREAD BY ID
  async function getThreadById() {
    try {
      const response = await API.get(`/threads/${id}`);
      // console.log(response);
      setThreadDetail(response.data);
    } catch (error) {
      console.log("Error getting one thread :", error);
      throw error;
    }
  }

  // GET REPLIES
  async function getReplies() {
    try {
      const response = await API.get(`/replies?thread_id=${id}`);
      dispatch(GET_REPLIES(response.data));
    } catch (error) {
      console.log("Error getting one thread :", error);
      throw error;
    }
  }

  // POST REPLY
  const [data, setData] = React.useState<any>({
    content: "",
    image: "",
    threads: Number(id),
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;
    if (files) {
      setData({
        ...data,
        [name]: files[0],
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  }

  async function HandlePostReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("content", data.content);
      formData.append("image", data.image as File);
      formData.append("threads", data.threads);
      const response = await API.post("/replies", formData);
      console.log(response.data);
      getReplies();
    } catch (error) {
      console.log("Error posting replies :", error);
    }
  }

  useEffect(() => {
    getThreadById();
    getReplies();
  }, [dispatch]);

  return {
    threadDetail,
    handleChange,
    HandlePostReply,
    fileInputRef,
    replies,
  };
}

// INI MENGGUNAKAN REACT QUERY

// import { useParams } from "react-router-dom";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { API } from "../../../libs/axios";
// import { IReplyThread } from "../../../interface/IThread";
// import React, { useState } from "react";

// // GET THREAD DETAIL BY ID
// function useThreadDetail() {
//   const { id } = useParams();

//   const {
//     data: threadDetail,
//     isLoading,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["threadDetail"],
//     queryFn: async () => API.get(`/threads/${id}`).then((data) => data.data.data),
//   });

//   return {
//     threadDetail,
//     isLoading,
//     error,
//     refetch,
//   };
// }

// // GET THREAD DETAIL BY ID
// function useGetReplies() {
//   const id = useParams();
//   const {
//     data: getReplies,
//     isLoading,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["getReplies", id],
//     queryFn: async () => API.get(`/replies`).then((data) => data.data.data),
//   });

//   return {
//     getReplies,
//     isLoading,
//     error,
//     refetch,
//   };
// }

// // POST REPLIES
// function usePostReplies() {
//   const { refetch } = useGetReplies();
//   const { id } = useParams();
//   const threadsId = Number(id);

//   const [replies, setReplies] = React.useState<IReplyThread>({
//     content: "",
//     image: "",
//     threads: threadsId,
//   });

//   const [file, setFile] = useState<File | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       setFile(files[0]);
//     } else {
//       setReplies({
//         ...replies,
//         [name]: value,
//       });
//     }
//   };

//   const fileInputRef = React.useRef<HTMLInputElement>(null);

//   const postReplies = useMutation({
//     mutationFn: async () => {
//       if (!replies.content.trim()) {
//         throw new Error('"content" cannot be empty');
//       }

//       const formData = new FormData();
//       formData.append("content", replies.content);
//       formData.append("image", file as File);
//       formData.append("threads", threadsId.toString());

//       await API.post("/replies", formData);

//       refetch();
//       setReplies({
//         content: "",
//         image: "",
//         threads: threadsId,
//       });
//     },

//     onError: (error) => {
//       console.error("Error uploading thread:", error.message);
//     },
//   });

//   return {
//     replies,
//     handleChange,
//     fileInputRef,
//     postReplies,
//   };
// }

// export { useThreadDetail, usePostReplies, useGetReplies };
