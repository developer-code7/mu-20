import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../../supabase/supabase.client"; // Adjust the path
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./usersSlice";
import toast from "react-hot-toast";
import axiosInstance from "../../../helper/axiosInstance";

export const fetchUsersBySchoolId = createAsyncThunk(
  "users/fetchUsersBySchoolId",
  async (
    {
      challenge_id,
      school_id,
    }: { challenge_id: string; school_id: string },
    { dispatch }
  ) => {
    dispatch(fetchUsersStart());
    try {
      const response = await axiosInstance.get(
        `/users/get-eligible-users/${school_id}/${challenge_id}`
      );

      dispatch(fetchUsersSuccess(response.data.data));
      return response.data.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      dispatch(fetchUsersFailure(error?.response?.data?.error));
      throw new Error(error?.response?.data?.error);
    }
  }
);
