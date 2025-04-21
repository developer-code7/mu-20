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
      toast.error("Something went wrong");
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
    toast.error("Something went wrong");
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
    contact,
    gender,
  }: {
    email: string;
    password: string;
    name: string;
    schoolId: string;
    student_class: string;
    contact: string;
    gender: string;
  }) => {
    try {
      const response = await axiosInstance.post("/users/sign-up", {
        name,
        email,
        password,
        school_id: schoolId,
        student_class,
        contact,
        gender,
      });

      toast.success("Registraion Successfull, Login Please!!");
      return response.data.data;
    } catch (error: any) {
      toast.error("Something went wrong");
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (
    {
      id,
      name,
      email,
      school,
      school_id,
      contact,
    }: {
      id: string;
      name: string;
      email: string;
      school: string;
      school_id: string | null;
      contact: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.put(`/users/update-user/${id}`, {
        name,
        email,
        school,
        school_id,
        contact,
      });

      toast.success("User updated successfully!");
      return response.data.data;
    } catch (error: any) {
      toast.error("Failed to update user");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
