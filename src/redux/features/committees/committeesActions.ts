import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCommitteesStart,
  fetchCommitteesSuccess,
  fetchCommitteesFailure,
} from "./committeesSlice";
import { supabase } from "../../../../supabase/supabase.client"; // Adjust the path
import toast from "react-hot-toast";

export const fetchCommitteesByChallengeId = createAsyncThunk(
  "committees/fetchCommitteesByChallengeId",
  async (challengeId: string, { dispatch }) => {
    dispatch(fetchCommitteesStart());
    try {
      // Fetch committees and their associated portfolios for the given challenge_id
      const { data: committees, error } = await supabase.rpc(
        "fetch_committees_with_portfolios",
        { input_challenge_id: challengeId }
      );

      dispatch(fetchCommitteesSuccess(committees || []));
    } catch (err: any) {
      toast.error(err.message);
      dispatch(fetchCommitteesFailure(err.message));
    }
  }
);
