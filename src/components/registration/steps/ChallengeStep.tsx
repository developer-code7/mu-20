import React, { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { fetchChallenges } from "../../../redux/features/challenges/challengesActions";
import { RootState } from "../../../redux/store";
interface ChallengeStepProps {
  challengeId: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ChallengeStep: React.FC<ChallengeStepProps> = ({
  challengeId,
  onChange,
}) => {
  const dispatch = useAppDispatch();
  const { challenges, loading } = useAppSelector(
    (state: RootState) => state.challenges
  );

  useEffect(() => {
    dispatch(fetchChallenges());
  }, [dispatch]);
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Challenge
      </label>
      <select
        name="challenge_id"
        value={challengeId}
        onChange={onChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
        required
      >
        <option value="">Select a challenge</option>
        {!loading &&
          challenges.map((challenge) => (
            <option key={challenge.challenge_id} value={challenge.challenge_id}>
              {challenge.challenge_name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ChallengeStep;
