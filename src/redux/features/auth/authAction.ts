import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../../supabase/supabase.client"; // Ensure you have the client setup
import toast from "react-hot-toast";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data: authData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        toast.error(signInError.message);
        throw new Error(signInError.message);
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", authData.user?.id)
        .single();

      if (userError) {
        toast.error(userError.message);
        throw new Error(userError.message);
      }
      toast.success("Logged In Successfully!!");
      return {
        email: userData?.email,
        fullName: userData?.full_name,
        schoolId: userData?.school_id,
        id: userData?.user_id,
      }; // Return user data for potential chaining
    } catch (error: any) {
      toast.error(error?.message);
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await supabase.auth.signOut();

      toast.success("Logged Out Successfully!!");
    } catch (error: any) {
      toast.error(error.message);
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
      const { data: user, error: SignUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (SignUpError) {
        toast.error(SignUpError.message);
        throw new Error(SignUpError.message);
      }

      const { error: userError } = await supabase.from("users").insert({
        auth_id: user?.user?.id,
        email,
        password,
        full_name: fullName,
        school_id: schoolId,
      });

      if (userError) {
        toast.error(userError.message);
        throw new Error(userError.message);
      }

      toast.success("Registraion Successfull, Login Please!!");
      return user;
    } catch (err: any) {
      throw new Error(err.message || "Registration failed");
    }
  }
);
