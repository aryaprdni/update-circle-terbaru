/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootState";
import { GET_USERS, SET_FOLLOW } from "../../../store/RootReducer";
import { API, setAuthToken } from "../../../libs/axios";
import { ChangeEvent, useEffect, useState } from "react";
import { IUserSearch } from "../../../interface/IAuth";

export function useSearchUsers() {
  setAuthToken(localStorage.token);
  const dispatch = useDispatch();
  const searchUsers = useSelector((state: RootState) => state.users);
  const [search, setSearch] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<IUserSearch[]>([]);
  const auth = useSelector((state: RootState) => state.auth);
  

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearch(search);

    if (search === "") {
      setFilteredResults(searchUsers.users.filter((user: any) => user.user.id !== auth?.data.id));
    } else if (auth) {
      const filteredUsers = searchUsers.users.filter((user: IUserSearch) => {
        return user.id !== auth.data.id && Object.values(user).join("").toLowerCase().includes(search.toLowerCase());
      });
      setFilteredResults(filteredUsers);
    } else {
      setFilteredResults(searchUsers.users);
    }
  };

  async function getSearchUsers() {
    try {
      const response = await API.get("/users");
      dispatch(GET_USERS(response.data.data));
    } catch (error) {
      console.error("Error fetching search users:", error);
    }
  }

  async function handleFollow(id: number, followingUserId: number, is_following: boolean) {
    try {
      dispatch(SET_FOLLOW({ id: id, is_following: !is_following }));
      if (!is_following) {
        const response = await API.post(`/follow`, {
          followingUserId: followingUserId,
        });
        console.log("berhasil follow!", response.data);
      } else {
        const response = await API.delete(`/follow/${followingUserId}`);
        console.log("berhasil unfollow!", response.data);
      }
    } catch (error) {
      console.error("error", error);
      dispatch(SET_FOLLOW({ id: id, is_following: is_following }));
      throw error;
    }
  }

  useEffect(() => {
    getSearchUsers();
  }, []);

  return {
    getSearchUsers,
    searchUsers,
    handleSearch,
    filteredResults,
    handleFollow
  };
}
