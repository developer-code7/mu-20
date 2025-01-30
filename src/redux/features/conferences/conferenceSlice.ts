import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchConferenceById, fetchConferences } from "./conferencesActions";
import { Conference } from "../../../types/type";

interface ConferencesState {
  conferences: Conference[];
  selectedConference: Conference | null;
  loading: boolean;
  error: string | null;
}

const initialState: ConferencesState = {
  selectedConference: null,
  conferences: [],
  loading: false,
  error: null,
};

const conferencesSlice = createSlice({
  name: "conferences",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchConferences.fulfilled,
        (state, action: PayloadAction<Conference[]>) => {
          state.loading = false;
          state.conferences = action.payload;
        }
      )
      .addCase(
        fetchConferences.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchConferenceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchConferenceById.fulfilled,
        (state, action: PayloadAction<Conference>) => {
          state.loading = false;
          state.selectedConference = action.payload;
        }
      )
      .addCase(
        fetchConferenceById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.selectedConference = null;
          state.error = action.payload;
        }
      );
  },
});

export default conferencesSlice.reducer;
