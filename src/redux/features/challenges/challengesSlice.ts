// redux/features/challenges/challengesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Challenge } from "../../../types";  // Assume you have a `Challenge` type

interface ChallengesState {
  challenges: Challenge[];
  loading: boolean;
  error: string | null;
}

const initialState: ChallengesState = {
  challenges: [],
  loading: false,
  error: null,
};

const challengesSlice = createSlice({
  name: "challenges",
  initialState,
  reducers: {
    fetchChallengesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchChallengesSuccess(state, action: PayloadAction<Challenge[]>) {
      state.loading = false;
      state.challenges = action.payload;
    },
    fetchChallengesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchChallengesStart,
  fetchChallengesSuccess,
  fetchChallengesFailure,
} = challengesSlice.actions;

export default challengesSlice.reducer;
