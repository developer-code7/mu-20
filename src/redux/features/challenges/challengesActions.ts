// redux/features/challenges/challengesActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchChallengesStart,
  fetchChallengesSuccess,
  fetchChallengesFailure,
} from "./challengesSlice";
import { supabase } from "../../../../supabase/supabase.client"; // Path to Supabase client

export const fetchChallenges = createAsyncThunk(
  "challenges/fetchChallenges",
  async (_, { dispatch }) => {
    dispatch(fetchChallengesStart());
    try {
      const { data, error } = await supabase.from("challenges").select("*");
      if (error) throw new Error(error.message);
      dispatch(fetchChallengesSuccess(data));
    } catch (err: any) {
      dispatch(fetchChallengesFailure(err.message));
    }
  }
);
