// /redux/features/schools/schoolsActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSchoolsStart,
  fetchSchoolsSuccess,
  fetchSchoolsFailure,
} from "./schoolsSlice";
import { supabase } from "../../../../supabase/supabase.client.ts"; // Path to your Supabase client setup

export const fetchSchools = createAsyncThunk(
  "schools/fetchSchools",
  async (_, { dispatch }) => {
    dispatch(fetchSchoolsStart());
    try {
      const { data, error } = await supabase
        .from("schools")
        .select("school_id, school_name");
      if (error) throw new Error(error.message);
      dispatch(fetchSchoolsSuccess(data));
    } catch (err: any) {
      dispatch(fetchSchoolsFailure(err.message));
    }
  }
);
