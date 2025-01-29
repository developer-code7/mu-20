import React, { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { fetchChallenges } from "../../../redux/features/challenges/challengesActions";
import { RootState } from "../../../redux/store";
interface ChallengeStepProps {
  selectedChallenge: { id: string; name: string; team_size: number } | null;
  onChallengeSelect: (challenge: {
    id: string;
    name: string;
    team_size: number;
  }) => void;
}

const ChallengeStep: React.FC<ChallengeStepProps> = ({
  selectedChallenge,
  onChallengeSelect,
}) => {
  const dispatch = useAppDispatch();
  const { challenges, loading } = useAppSelector(
    (state: RootState) => state.challenges
  );

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) dispatch(fetchChallenges(user.id));
  }, [user, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedChallenge = challenges.find(
      (challenge) => challenge.challenge_id === selectedId
    );

    if (selectedChallenge) {
      onChallengeSelect({
        id: selectedChallenge.challenge_id,
        name: selectedChallenge.challenge_name,
        team_size: selectedChallenge.team_size,
      });
    }
  };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Challenge
      </label>
      <select
        name="challenge"
        value={selectedChallenge?.id || ""}
        onChange={handleChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
        required
      >
        <option value="">Select a challenge</option>
        {!loading &&
          challenges.map(
            (challenge) =>
              challenge.is_active &&
              !challenge.already_registered &&
              !challenge.time_conflict && (
                <option
                  key={challenge.challenge_id}
                  value={challenge.challenge_id}
                >
                  {challenge.challenge_name}
                </option>
              )
          )}
      </select>
    </div>
  );
};

export default ChallengeStep;
