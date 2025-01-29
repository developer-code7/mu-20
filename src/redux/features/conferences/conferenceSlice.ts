import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchConferences } from "./conferencesActions";

interface Conference {
  conference_id: string;
  conference_name: string;
  start_date: string;
  end_date: string;
  location: string;
  description: string;
}

interface ConferencesState {
  conferences: Conference[];
  loading: boolean;
  error: string | null;
}

const initialState: ConferencesState = {
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
      );
  },
});

export default conferencesSlice.reducer;
