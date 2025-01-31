import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchUserChallenges } from "../../redux/features/challenges/challengesActions";
import Skelleton from "./Skelleton";
import UserChallengeCard from "./UserChallengeCard";

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
    <div className="min-h-screen space-y-6">
      <div className="flex sm:flex-row flex-col items-start gap-2 sm:justify-between sm:items-center">
        <h1 className="sm:text-2xl text-xl font-bold text-white">
          Your Challenges
        </h1>
        <div className="bg-gray-800 rounded-lg p-1">
          <button
            className={`sm:px-4 sm:py-2 px-2 py-1 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "upcoming"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`sm:px-4 sm:py-2 px-2 py-1 rounded-lg text-sm font-medium transition-colors ${
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

      <div className="bg-gray-800 rounded-lg border border-gray-700 sm:p-6 p-4">
        {activeTab === "upcoming" ? (
          <div className="grid sm:gap-6 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              [...Array(6)].map((_, index) => <Skelleton key={index} />)
            ) : (
              <>
                {!loading && userChallenges.activeChallenges.length === 0 ? (
                  <div className="border text-white border-gray-700 rounded-lg p-4 w-full">
                    You have not registered for any upcoming challenges
                  </div>
                ) : (
                  userChallenges?.activeChallenges?.map((challenge) => (
                    <UserChallengeCard
                      challenge={challenge}
                      activeTab={activeTab}
                      key={challenge?.registration_details?.challenge_id}
                    />
                  ))
                )}
              </>
            )}
          </div>
        ) : (
          <>
            {userChallenges.unactiveChallenges.length === 0 ? (
              <div className="border text-white border-gray-700 rounded-lg sm:p-4 p-2 hover:border-orange-500 transition-colors">
                No Past Challenges Available
              </div>
            ) : (
              <div className="space-y-4">
                {userChallenges.unactiveChallenges?.map((challenge) => (
                  <UserChallengeCard
                    challenge={challenge}
                    activeTab={activeTab}
                    key={challenge?.registration_details?.challenge_id}
                  />
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
