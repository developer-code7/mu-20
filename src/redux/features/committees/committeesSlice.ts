import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Committee } from "../../../types/type";

interface CommitteesState {
  committees: Committee[];
  loading: boolean;
  error: string | null;
}

const initialState: CommitteesState = {
  committees: [],
  loading: false,
  error: null,
};

const committeesSlice = createSlice({
  name: "committees",
  initialState,
  reducers: {
    fetchCommitteesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCommitteesSuccess(state, action: PayloadAction<Committee[]>) {
      state.loading = false;
      state.committees = action.payload;
    },
    fetchCommitteesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCommitteesStart,
  fetchCommitteesSuccess,
  fetchCommitteesFailure,
} = committeesSlice.actions;

export default committeesSlice.reducer;
