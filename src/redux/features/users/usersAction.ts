import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../../supabase/supabase.client"; // Adjust the path
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./usersSlice";

export const fetchUsersBySchoolId = createAsyncThunk(
  "users/fetchUsersBySchoolId",
  async (schoolId: string, { dispatch }) => {
    dispatch(fetchUsersStart());
    try {
      const { data: users, error } = await supabase
        .from("users") // Adjust table name if necessary
        .select("user_id, full_name") // Fetch only user_id and full_name
        .eq("school_id", schoolId);

      if (error) throw new Error(error.message);
    
      dispatch(fetchUsersSuccess(users || []));
    } catch (err: any) {
      dispatch(fetchUsersFailure(err.message));
    }
  }
);
