import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../../helper/axiosInstance";

export const fetchConferences = createAsyncThunk(
  "conferences/fetchConferences",
  async () => {
    try {
      const response = await axiosInstance.get("/conferences");

      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  }
);

export const fetchConferenceById = createAsyncThunk(
  "conferences/fetchConferenceById",
  async (id: string) => {
    try {
      const response = await axiosInstance.get(`/conferences/${id}`);

      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  }
);
