import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../../supabase/supabase.client"; // Ensure you have the client setup
import { setAuthUser } from "./authSlice";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      // 1. Log in the user with Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      console.log("authdata", authData);
      if (authError) {
        throw new Error(authError.message);
      }

      // 2. Fetch user details from the 'users' table
      const { data: userData, error: dbError } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", authData.user?.id)
        .single();

      if (dbError) {
        throw new Error(dbError.message);
      }
      return userData; // Return user data for potential chaining
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// Thunk to handle user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({
    email,
    password,
    fullName,
    schoolId,
  }: {
    email: string;
    password: string;
    fullName: string;
    schoolId: string;
  }) => {
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

      return user?.user;
    } catch (err: any) {
      throw new Error(err.message || "Registration failed");
    }
  }
);
