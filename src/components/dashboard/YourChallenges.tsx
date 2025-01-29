import React, { useEffect, useState } from "react";
import { Users, Target, Calendar, Clock } from "lucide-react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchUserChallenges } from "../../redux/features/challenges/challengesActions";
import { formatDate } from "../../utils/formateDate";
const YourChallenges = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const { userChallenges, loading } = useAppSelector(
    (state) => state.challenges
  );
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchUserChallenges(user.id));

      
    }
  }, [user, dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Your Challenges</h1>
        <div className="bg-gray-800 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "upcoming"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "past"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("past")}
          >
            Past
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        {activeTab === "upcoming" ? (
          <div className="space-y-4">
            {loading && <div>Loading...</div>}
            {!loading && userChallenges.activeChallenges.length === 0 ? (
              <div className="border text-white border-gray-700 rounded-lg p-4 hover:border-orange-500 transition-colors">
                You have not registered for any upcoming challenges
              </div>
            ) : (
              userChallenges?.activeChallenges?.map((challenge) => (
                <div
                  key={challenge?.registration_details?.challenge_id}
                  className="border border-gray-700 rounded-lg p-4 hover:border-orange-500 transition-colors flex flex-col h-full max-w-[400px]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {challenge?.challenge_details?.challenge_name}
                      </h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center text-sm text-gray-400">
                          <Users className="h-4 w-4 mr-2" />
                          <span>
                            Team: {challenge?.team_details?.team_name}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>
                            Starts:{" "}
                            {formatDate(
                              challenge?.challenge_details?.start_date
                            )}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>
                            Registered On:{" "}
                            {formatDate(
                              challenge?.registration_details?.registration_date
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-900 text-green-300 text-sm font-medium rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="mt-4">
                    <button className="text-orange-500 hover:text-orange-400 text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <>
            {userChallenges.unactiveChallenges.length === 0 ? (
              <div className="border text-white border-gray-700 rounded-lg p-4 hover:border-orange-500 transition-colors">
                No Past Challenges Available
              </div>
            ) : (
              <div className="space-y-4">
                {userChallenges.unactiveChallenges?.map((challenge) => (
                  <div
                    key={challenge?.registration_details?.challenge_id}
                    className="border border-gray-700 rounded-lg p-4 hover:border-orange-500 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          {challenge?.registration_details?.challenge_name}
                        </h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center text-sm text-gray-400">
                            <Users className="h-4 w-4 mr-2" />
                            <span>
                              Team: {challenge?.team_details?.team_name}
                            </span>
                          </div>
                          {/* <div className="flex items-center text-sm text-gray-400">
                        <Target className="h-4 w-4 mr-2" />
                        <span>Committee: {challenge.committee}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Completed: {challenge.completedDate}</span>
                      </div> */}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-purple-900 text-purple-300 text-sm font-medium rounded-full">
                        Completed
                      </span>
                    </div>
                    <div className="mt-4">
                      <button className="text-orange-500 hover:text-orange-400 text-sm font-medium">
                        View Results →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default YourChallenges;
