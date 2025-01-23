import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../../supabase/supabase.client"; // Ensure you have the client setup
import { setAuthUser } from "./authSlice";

// Thunk to handle user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      email,
      password,
      fullName,
      schoolId,
    }: { email: string; password: string; fullName: string; schoolId: string },
    { dispatch }
  ) => {
    try {
      // 1. Create user in Supabase Auth
      const { data: user, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.log("auth-error");
        throw new Error(authError.message);
      }

      // 2. Save additional user metadata to "users" table
      const { error: dbError } = await supabase.from("users").insert({
        auth_id: user?.user?.id,
        email,
        password,
        full_name: fullName,
        school_id: schoolId,
      });

      if (dbError) {
        throw new Error(dbError.message);
      }

      dispatch(setAuthUser({ id: user?.user?.id, email, fullName, schoolId }));

      return user?.user;
    } catch (err: any) {
      throw new Error(err.message || "Registration failed");
    }
  }
);
