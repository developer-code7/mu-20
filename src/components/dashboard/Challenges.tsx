import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchChallenges } from "../../redux/features/challenges/challengesActions";
import { useNavigate } from "react-router-dom";
import Skelleton from "./Skelleton";
import ChallengeCard from "./ChallengeCard";

interface ChallengesProps {
  conferenceId: string | null;
}
const Challenges: React.FC<ChallengesProps> = ({ conferenceId }) => {
  const dispatch = useAppDispatch();
  const { challenges, loading } = useAppSelector((state) => state.challenges);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleClick = async (
    id: string,
    alreadyRegistered: boolean,
    timeConflict: boolean
  ) => {
    if (alreadyRegistered || timeConflict) {
      return; // Prevent click if already registered or time conflict
    } else {
      navigate(`/conference/${conferenceId}/challenge-register/${id}`);
    }
  };

  useEffect(() => {
    if (user && conferenceId)
      dispatch(fetchChallenges({ conferenceId, userId: user.id }));
  }, [conferenceId, user, dispatch]);
  return (
    <div className="space-y-6 mt-10">
      <h1 className="text-2xl font-bold text-white">Challenges</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          [...Array(6)].map((_, index) => <Skelleton key={index} />)
        ) : challenges.length > 0 ? (
          challenges?.map((challenge) => (
            <ChallengeCard
              challenge={challenge}
              handleClick={handleClick}
              key={challenge.challenge_id}
            />
          ))
        ) : (
          <div className="bg-[#0F1729] p-8 text-white">
            <div className="max-w-5xl mx-auto">
              <h1>No Active Challenges Found</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;
