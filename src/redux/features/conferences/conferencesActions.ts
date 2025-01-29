import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../../supabase/supabase.client";

// Fetch all conferences from the database
export const fetchConferences = createAsyncThunk(
  "conferences/fetchConferences",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("conferences") // Replace with your table name
        .select("*");

      if (error) {
        throw new Error(error.message);
      }

      return data; // This will be the list of conferences
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
