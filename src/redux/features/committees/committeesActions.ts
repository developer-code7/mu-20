import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCommitteesStart,
  fetchCommitteesSuccess,
  fetchCommitteesFailure,
} from "./committeesSlice";
import toast from "react-hot-toast";
import axiosInstance from "../../../helper/axiosInstance";

export const fetchCommitteesByChallengeId = createAsyncThunk(
  "committees/fetchCommitteesByChallengeId",
  async (challengeId: string, { dispatch }) => {
    dispatch(fetchCommitteesStart());
    try {
      const response = await axiosInstance.get(
        `/committees/get-committees-portfolios/${challengeId}`
      );

      dispatch(fetchCommitteesSuccess(response.data.data || []));

      return response.data.data;
    } catch (error: any) {
      toast.error("Something went wrong");

      dispatch(fetchCommitteesFailure(error.message));
      throw error;
    }
  }
);
