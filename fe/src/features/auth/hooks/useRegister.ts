/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from "react";
import { IRegister } from "../../../interface/IAuth";
import { API } from "../../../libs/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useRegister() {
  
  const [form, setForm] = useState<IRegister>({
    email: "",
    username: "",
    full_name: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleRegister() {
    try {
      const response = await API.post("/user/register", form);
      console.log(response);
      if (response.status === 201) {
        toast.success("Registration successful!");
      } else {
        toast.error("Registration failed:" + response.data.details[0].message);
      }
    } catch (error: any) {
      console.log(error)
      if(error.response && error.response.status === 400) {
        toast.error(error.response.data.details[0].message || "An error occurred during registration.");
      } else {
        toast.error("An error occurred during registration.");
      }
    }
  }
  

  return { handleChange, handleRegister };
}
