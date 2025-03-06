import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { fetchCommitteesByChallengeId } from "../../../redux/features/committees/committeesActions";
import { RootState } from "../../../redux/store";
import TextShimmer from "../../TextShimmer";
import { Committee } from "../../../types/type";

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
  const [filteredCommitteePortfolio, setFilteredCommitteePortfolio] = useState<
    Committee[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { committees, loading } = useAppSelector(
    (state: RootState) => state.committees
  );

  useEffect(() => {
    if (selectedChallenge) {
      dispatch(fetchCommitteesByChallengeId(selectedChallenge.id));
    }
  }, [dispatch, selectedChallenge]);

  useEffect(() => {
    setFilteredCommitteePortfolio(
      committees.filter((committee) =>
        committee.committee_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [committees, searchTerm]);

  if (!selectedChallenge) {
    return <div>Please select a challenge first.</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">
        Committee Preferences for {selectedChallenge.name}
      </h3>
      <div className="bg-white p-2 rounded-lg">
        <input
          type="text"
          placeholder="Search Committee"
          className="w-full px-3 outline-none "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 max-h-[250px] overflow-y-scroll no-scrollbar">
        {loading ? (
          <TextShimmer lines={1} />
        ) : filteredCommitteePortfolio.length === 0 ? (
          <div className="text-white">{`No committees found`}</div>
        ) : (
          filteredCommitteePortfolio.map((committee) => (
            <div
              key={committee.committee_id}
              className="bg-[#606060] p-4 rounded-lg border border-[#D4D7E3]"
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
                  className="hover:cursor-pointer h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`committee-${committee.committee_id}`}
                  className="ml-2 text-sm font-medium text-white font-extrabold"
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
                        type="radio"
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
                        className="hover:cursor-pointer h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`portfolio-${portfolio.portfolio_id}`}
                        className="ml-2 text-sm text-white"
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
    </div>
  );
};

export default CommitteeStep;
