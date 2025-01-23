import React, { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { fetchCommitteesByChallengeId } from "../../../redux/features/committees/committeesActions";
import { RootState } from "../../../redux/store";
interface CommitteeStepProps {
  challengeId: string;
  committeePreferences: { [key: string]: string[] };
  onCommitteeToggle: (committeeId: string) => void;
  onPortfolioChange: (committeeId: string, portfolioId: string) => void;
}

const CommitteeStep: React.FC<CommitteeStepProps> = ({
  challengeId,
  committeePreferences,
  onCommitteeToggle,
  onPortfolioChange,
}) => {
  const dispatch = useAppDispatch();
  const { committees, loading } = useAppSelector(
    (state: RootState) => state.committees
  );

  useEffect(() => {
    dispatch(fetchCommitteesByChallengeId(challengeId));
  }, [dispatch, challengeId]);

  if (!challengeId) {
    return <div>Please select a challenge first</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        Committee Preferences
      </h3>
      {!loading && committees?.map((committee) => (
        <div key={committee.committee_id} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`committee-${committee.committee_id}`}
              checked={!!committeePreferences[committee.committee_id]}
              onChange={() => onCommitteeToggle(committee.committee_id)}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label
              htmlFor={`committee-${committee.committee_id}`}
              className="ml-2 text-sm font-medium text-gray-700"
            >
              {committee.committee_name}
            </label>
          </div>

          {committeePreferences[committee.committee_id] && (
            <div className="ml-6 mt-2 space-y-2">
              {committee.portfolios.map((portfolio , index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`portfolio-${portfolio.portfolio_id}`}
                    checked={committeePreferences[
                      committee.committee_id
                    ]?.includes(portfolio.portfolio_id)}
                    onChange={() =>
                      onPortfolioChange(
                        committee.committee_id,
                        portfolio.portfolio_id
                      )
                    }
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`portfolio-${portfolio.portfolio_id}`}
                    className="ml-2 text-sm text-gray-600"
                  >
                    {portfolio.portfolio_name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommitteeStep;
