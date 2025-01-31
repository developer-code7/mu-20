// redux/features/challenges/challengesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchChallengeById, fetchUserChallenges } from "./challengesActions";
import { Challenge , ChallengeRegistration } from "../../../types/type";
interface ChallengesState {
  challenges: Challenge[];
  userChallenges: {
    activeChallenges: ChallengeRegistration[];
    unactiveChallenges: ChallengeRegistration[];
  };
  selectedChallenge: Challenge | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChallengesState = {
  challenges: [],
  userChallenges: {
    activeChallenges: [],
    unactiveChallenges: [],
  },
  selectedChallenge: null,
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
    clearSelectedChallenge(state) {
      state.selectedChallenge = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChallengeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChallengeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedChallenge = action.payload;
      })
      .addCase(fetchChallengeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserChallenges.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserChallenges.fulfilled, (state, action) => {
        state.loading = false;
        state.userChallenges.activeChallenges = action.payload.activeChallenges;
        state.userChallenges.unactiveChallenges =
          action.payload.unactiveChallenges;
      })
      .addCase(fetchUserChallenges.rejected, (state, action) => {
        state.loading = false;
        state.userChallenges.activeChallenges = [];
        state.userChallenges.unactiveChallenges = [];
        state.error = action.payload as string;
      });
  },
});

export const {
  fetchChallengesStart,
  fetchChallengesSuccess,
  fetchChallengesFailure,
  clearSelectedChallenge,
} = challengesSlice.actions;

export default challengesSlice.reducer;
