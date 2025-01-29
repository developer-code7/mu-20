import React, { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { fetchCommitteesByChallengeId } from "../../../redux/features/committees/committeesActions";
import { RootState } from "../../../redux/store";

interface CommitteeStepProps {
  selectedChallenge: { id: string; name: string } | null;
  committeePreferences: {
    [key: string]: {
      id: string;
      name: string;
      portfolio_preferences: { portfolio_id: string; portfolio_name: string }[];
    };
  };
  onCommitteeToggle: (committeeId: string, committeeName: string) => void;
  onPortfolioChange: (
    committeeId: string,
    portfolioId: string,
    portfolioName: string
  ) => void;
}

const CommitteeStep: React.FC<CommitteeStepProps> = ({
  selectedChallenge,
  committeePreferences,
  onCommitteeToggle,
  onPortfolioChange,
}) => {
  const dispatch = useAppDispatch();
  const { committees, loading } = useAppSelector(
    (state: RootState) => state.committees
  );

  useEffect(() => {
    if (selectedChallenge) {
      dispatch(fetchCommitteesByChallengeId(selectedChallenge.id));
    }
  }, [dispatch, selectedChallenge]);

  if (!selectedChallenge) {
    return <div>Please select a challenge first.</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        Committee Preferences for {selectedChallenge.name}
      </h3>
      {loading && <div>Loading committees...</div>}

      {!loading && committees.length === 0 ? (
        <div>No committees available for this challenge.</div>
      ) : (
        committees.map((committee) => (
          <div
            key={committee.committee_id}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`committee-${committee.committee_id}`}
                checked={!!committeePreferences[committee.committee_id]}
                onChange={() =>
                  onCommitteeToggle(
                    committee.committee_id,
                    committee.committee_name
                  )
                }
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
                {committee.portfolios.map((portfolio) => (
                  <div
                    key={portfolio.portfolio_id}
                    className="flex items-center"
                  >
                    <input
                      type="checkbox"
                      id={`portfolio-${portfolio.portfolio_id}`}
                      checked={committeePreferences[
                        committee.committee_id
                      ]?.portfolio_preferences?.some(
                        (p) => p.portfolio_id === portfolio.portfolio_id
                      )}
                      onChange={() =>
                        onPortfolioChange(
                          committee.committee_id,
                          portfolio.portfolio_id,
                          portfolio.portfolio_name
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
        ))
      )}
    </div>
  );
};

export default CommitteeStep;
