import { configureStore } from "@reduxjs/toolkit";
import schoolsReducer from "./features/schools/schoolsSlice";
import challengesReducer from "./features/challenges/challengesSlice";
import committeesReducer from "./features/committees/committeesSlice";
import usersReducer from "./features/users/usersSlice";
import authReducer from "./features/auth/authSlice";
import conferencesReducer from "./features/conferences/conferenceSlice";
export const store = configureStore({
  reducer: {
    schools: schoolsReducer,
    challenges: challengesReducer,
    committees: committeesReducer,
    users: usersReducer,
    auth: authReducer,
    conferences: conferencesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
