// /redux/features/schools/schoolsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { School } from '../../../types';

interface SchoolsState {
  data: School[];
  loading: boolean;
  error: string | null;
}

const initialState: SchoolsState = {
  data: [],
  loading: false,
  error: null,
};

const schoolsSlice = createSlice({
  name: 'schools',
  initialState,
  reducers: {
    fetchSchoolsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSchoolsSuccess(state, action: PayloadAction<School[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchSchoolsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSchoolsStart,
  fetchSchoolsSuccess,
  fetchSchoolsFailure,
} = schoolsSlice.actions;

export default schoolsSlice.reducer;
