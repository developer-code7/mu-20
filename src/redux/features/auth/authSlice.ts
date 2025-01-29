import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authAction";

interface AuthState {
  session: string | null;
  user: {
    id: string;
    email: string;
    fullName: string;
    schoolId: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  session: "",
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSession(state, action) {
      state.session = action.payload;
    },
    setAuthUser(state, action) {
      state.user = action.payload;
    },
    clearAuthState(state) {
      state.session = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      });
  },
});

export const { setAuthSession, setAuthUser, clearAuthState } =
  authSlice.actions;

export default authSlice.reducer;
