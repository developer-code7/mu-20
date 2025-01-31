// redux/features/challenges/challengesActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchChallengesStart,
  fetchChallengesSuccess,
  fetchChallengesFailure,
} from "./challengesSlice";

import { supabase } from "../../../../supabase/supabase.client";
import toast from "react-hot-toast";

export const fetchChallenges = createAsyncThunk(
  "challenges/fetchChallenges",
  async (
    { conferenceId, userId }: { conferenceId: string; userId: string },
    { dispatch }
  ) => {
    dispatch(fetchChallengesStart());

    try {
      if (!userId) {
        toast.error("Something went wrong");
        return;
      }
      const { data: userChallenges } = await supabase.rpc(
        "get_user_challenges",
        { user_input_id: userId }
      );

      const { data: allChallenges } = await supabase
        .from("challenges")
        .select("*")
        .eq("conference_id", conferenceId)
        .eq("is_active", true);

      let challenges = [];
      if (allChallenges) {
        challenges = allChallenges.map((challenge) => {
          const alreadyRegistered = userChallenges?.some(
            (userChallenge) =>
              userChallenge.challenge_id === challenge.challenge_id
          );
          const timeConflict = userChallenges?.some(
            (userChallenge) =>
              challenge.start_date < userChallenge.end_date &&
              challenge.end_date > userChallenge.start_date
          );

          return {
            ...challenge,
            already_registered: alreadyRegistered,
            time_conflict: timeConflict,
          };
        });
      }

      // Dispatch the final data
      dispatch(fetchChallengesSuccess(challenges));
    } catch (err: any) {
      toast.error(err.message);
      dispatch(fetchChallengesFailure(err.message));
    }
  }
);

export const fetchChallengeById = createAsyncThunk(
  "challenges/fetchChallengeById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .eq("challenge_id", id)
        .single();

      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserChallenges = createAsyncThunk(
  "challenges/fetchUserChallenges",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.rpc("fetch_user_challenges", {
        user_id_input: userId,
      });

      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      const activeChallenges = [];
      const unactiveChallenges = [];

      for (const challenge of data) {
        if (challenge?.challenge_details?.is_active) {
          activeChallenges.push(challenge);
        } else {
          unactiveChallenges.push(challenge);
        }
      }

      return { activeChallenges, unactiveChallenges };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
