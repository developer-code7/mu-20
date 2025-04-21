// /redux/features/schools/schoolsActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSchoolsStart,
  fetchSchoolsSuccess,
  fetchSchoolsFailure,
} from "./schoolsSlice";
import toast from "react-hot-toast";
import axiosInstance from "../../../helper/axiosInstance.ts";

export const fetchSchools = createAsyncThunk(
  "schools/fetchSchools",
  async (_, { dispatch }) => {
    dispatch(fetchSchoolsStart());
    try {
      const response = await axiosInstance.get("/schools");

      dispatch(fetchSchoolsSuccess(response.data.data));
    } catch (error: any) {
      toast.error("Something went wrong");
      fetchSchoolsFailure(error?.response?.data?.error);
      throw error;
    }
  }
);

export const fetchSchoolById = createAsyncThunk(
  "schools/fetchSchoolById",
  async (schoolId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/schools/${schoolId}`);
      return response.data.data; 
    } catch (error: any) {
      toast.error("Failed to fetch school");
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);
