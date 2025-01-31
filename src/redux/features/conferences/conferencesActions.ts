import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../../supabase/supabase.client";
import toast from "react-hot-toast";

// Fetch all conferences from the database
export const fetchConferences = createAsyncThunk(
  "conferences/fetchConferences",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("conferences").select("*");

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (err: any) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchConferenceById = createAsyncThunk(
  "conferences/fetchConferenceById",
  async (conferenceId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("conferences")
        .select("*")
        .eq("conference_id", conferenceId)
        .single(); // Ensure only one record is returned

      return data;
    } catch (err: any) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);
