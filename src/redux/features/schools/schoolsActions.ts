// /redux/features/schools/schoolsActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSchoolsStart,
  fetchSchoolsSuccess,
  fetchSchoolsFailure,
} from "./schoolsSlice";
import { supabase } from "../../../../supabase/supabase.client.ts"; // Path to your Supabase client setup
import toast from "react-hot-toast";

export const fetchSchools = createAsyncThunk(
  "schools/fetchSchools",
  async (_, { dispatch }) => {
    dispatch(fetchSchoolsStart());
    try {
      const { data } = await supabase
        .from("schools")
        .select("school_id, school_name");

      dispatch(fetchSchoolsSuccess(data));
    } catch (err: any) {
      toast.error(err.message);
      dispatch(fetchSchoolsFailure(err.message));
      throw new Error(err.message);
    }
  }
);
