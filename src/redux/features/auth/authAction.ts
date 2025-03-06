import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../helper/axiosInstance";
import toast from "react-hot-toast";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axiosInstance.post("/users/login-user", {
        email,
        password,
      });
      toast.success(response.data?.message);
      return response.data.data.user;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
      throw error;
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const response = await axiosInstance.get("/users/get-current-user");
    return response.data.data.user;
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axiosInstance.post("/users/logout-user");
    toast.success(response.data?.message);
    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});
// Thunk to handle user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({
    email,
    password,
    name,
    schoolId,
    student_class,
    contact = "9112345678",
  }: {
    email: string;
    password: string;
    name: string;
    schoolId: string;
    student_class: string;
    contact: string;
  }) => {
    try {
      const response = await axiosInstance.post("/users/sign-up", {
        name,
        email,
        password,
        school_id:schoolId,
        student_class,
        contact,
      });

      toast.success("Registraion Successfull, Login Please!!");
      return response.data.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);
