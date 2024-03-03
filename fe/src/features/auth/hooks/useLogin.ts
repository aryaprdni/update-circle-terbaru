/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../../../interface/IAuth";
import { API } from "../../../libs/axios";
import { AUTH_LOGIN } from "../../../store/RootReducer";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState<ILogin>({
    username: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleLogin() {
    try {
      const response = await API.post("/user/login", form);
      console.log(response)
      dispatch(AUTH_LOGIN(response.data));
      if (response.status === 200) {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error : any) {
      console.log(error)
      if(error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "An error occurred during registration.");
      } else {
        toast.error("An error occurred during registration.");
      }
    }
  }
  
  return { handleChange, handleLogin };
}
