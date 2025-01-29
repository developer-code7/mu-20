import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchChallenges } from "../../redux/features/challenges/challengesActions";
import { Calendar, Users, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "@reduxjs/toolkit/query";
import { supabase } from "../../../supabase/supabase.client";
import { formatDate } from "../../utils/formateDate";
import Skelleton from "./Skelleton";
const Challenges = () => {
  const dispatch = useAppDispatch();
  const { challenges, loading } = useAppSelector(
    (state: RootState) => state.challenges
  );
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleClick = async (
    id: string,
    alreadyRegistered: boolean,
    timeConflict: boolean
  ) => {
    if (alreadyRegistered || timeConflict) {
      return; // Prevent click if already registered or time conflict
    }
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("team_id")
        .eq("user_id", user?.id);

      if (data && data.length > 0) {
        alert("You have already registered for a challenge");
      } else {
        navigate(`/challenge-register/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) dispatch(fetchChallenges(user.id));

    console.log(challenges);
  }, [user, dispatch]);
  return (
    <div className="space-y-6 mt-10">
      <h1 className="text-2xl font-bold text-white">Challenges</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          [...Array(6)].map((_, index) => <Skelleton key={index} />)
        ) : challenges.length > 0 ? (
          challenges?.map((challenge) => (
            <div
              key={challenge.challenge_id}
              className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-orange-500 transition-colors flex flex-col h-full"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {challenge.challenge_name}
                </h3>
                <Calendar className="h-5 w-5 text-orange-500" />
              </div>

              <div className="mt-4 space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{`Registration closes on ${formatDate(
                    challenge.start_date
                  )} `}</span>
                </div>
              </div>

              <div className="relative mt-auto group">
                <button
                  onClick={() =>
                    handleClick(
                      challenge.challenge_id,
                      challenge.already_registered,
                      challenge.time_conflict
                    )
                  }
                  disabled={
                    challenge.already_registered || challenge.time_conflict
                  }
                  className={`w-full py-2 px-4 rounded-lg transition-colors ${
                    challenge.already_registered || challenge.time_conflict
                      ? "bg-gray-600 cursor-not-allowed text-gray-300"
                      : "bg-orange-600 text-white hover:bg-orange-700"
                  }`}
                >
                  Register Now
                </button>

                {/* Tooltip for registration status */}
                {(challenge.already_registered || challenge.time_conflict) && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {challenge.already_registered
                      ? "Already registered for this challenge"
                      : "Time conflict with another registered challenge"}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No Active Challenges Found</div>
        )}
      </div>
    </div>
  );
};

export default Challenges;
