import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../../supabase/supabase.client"; // Adjust the path
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./usersSlice";
import toast from "react-hot-toast";

export const fetchUsersBySchoolId = createAsyncThunk(
  "users/fetchUsersBySchoolId",
  async (
    {
      input_challenge_id,
      input_school_id,
    }: { input_challenge_id: string; input_school_id: string },
    { dispatch }
  ) => {
    dispatch(fetchUsersStart());
    try {
      const { data: users, error } = await supabase.rpc("get_eligible_users", {
        input_challenge_id,
        input_school_id,
      });

      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }

      dispatch(fetchUsersSuccess(users || []));
      return users; // Return users so that it can be used in components if needed
    } catch (err: any) {
      dispatch(fetchUsersFailure(err.message));
      throw new Error(err.message);
    }
  }
);
