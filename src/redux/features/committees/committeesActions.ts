import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCommitteesStart,
  fetchCommitteesSuccess,
  fetchCommitteesFailure,
} from "./committeesSlice";
import { supabase } from "../../../../supabase/supabase.client"; // Adjust the path

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

      if (error) throw new Error(error.message);

      dispatch(fetchCommitteesSuccess(committees || []));
    } catch (err: any) {
      dispatch(fetchCommitteesFailure(err.message));
    }
  }
);
