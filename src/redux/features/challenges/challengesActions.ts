// redux/features/challenges/challengesActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchChallengesStart,
  fetchChallengesSuccess,
  fetchChallengesFailure,
} from "./challengesSlice";

import { supabase } from "../../../../supabase/supabase.client";
import toast from "react-hot-toast";
import axiosInstance from "../../../helper/axiosInstance";

export const fetchChallenges = createAsyncThunk(
  "challenges/fetchChallenges",
  async (
    { conferenceId, userId }: { conferenceId: string; userId: string },
    { dispatch }
  ) => {
    dispatch(fetchChallengesStart());

    try {
      const response = await axiosInstance.get(
        `challenges/get-user-elligble-challenges/${conferenceId}/${userId}`
      );
      // Dispatch the final data
      dispatch(fetchChallengesSuccess(response?.data?.data));
    } catch (error: any) {
      toast.error("Something went wrong");
      dispatch(fetchChallengesFailure(error?.response?.data?.error));
      throw error;
    }
  }
);

export const fetchChallengeById = createAsyncThunk(
  "challenges/fetchChallengeById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/challenges/get-challenge/${id}`
      );

      return { ...response?.data?.data };
    } catch (error: any) {
      toast.error("Something went wrong");
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserChallenges = createAsyncThunk(
  "challenges/fetchUserChallenges",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/get-user-challenge-details`);

      return response.data.data;
    } catch (error: any) {
      toast.error("Something went wrong");
      return rejectWithValue(error.message);
    }
  }
);
