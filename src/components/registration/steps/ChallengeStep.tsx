import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { fetchChallenges } from "../../../redux/features/challenges/challengesActions";
import { RootState } from "../../../redux/store";
import { useParams } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Challenge } from "../../../types/type";

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
  const { conferenceId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user && conferenceId) {
      dispatch(fetchChallenges({ conferenceId, userId: user.id }));
    }
  }, [conferenceId, user, dispatch]);

  useEffect(() => {
    setFilteredChallenges(
      challenges.filter(
        (challenge) =>
          challenge.is_active &&
          !challenge.already_registered &&
          !challenge.time_conflict &&
          challenge.challenge_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    );
  }, [challenges, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectChallenge = (challenge: Challenge) => {
    onChallengeSelect({
      id: challenge.challenge_id,
      name: challenge.challenge_name,
      team_size: challenge.team_size,
    });
    setDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Challenge
      </label>

      <div className=" py-2 flex items-center border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500">
        {dropdownOpen ? (
          <input
            type="text"
            placeholder="Search Challenge"
            className="w-full px-3 outline-none "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setDropdownOpen(true)}
          />
        ) : (
          <p
            className="w-full px-3 cursor-pointer"
            onClick={() => setDropdownOpen(true)}
          >
            {selectedChallenge?.name}
          </p>
        )}
        {dropdownOpen ? (
          <ChevronUp
            onClick={() => setDropdownOpen(false)}
            className="text-gray-500 transition-all duration-300 cursor-pointer"
          />
        ) : (
          <ChevronDown
            onClick={() => setDropdownOpen(true)}
            className="text-gray-500 transition-all duration-300 cursor-pointer"
          />
        )}
      </div>
      {dropdownOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-auto mt-1 overflow-y-scroll">
          {loading ? (
            <li className="px-3 py-2 text-gray-500">Loading...</li>
          ) : filteredChallenges.length > 0 ? (
            filteredChallenges.map((challenge) => (
              <li
                key={challenge.challenge_id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-200 "
                onClick={() => handleSelectChallenge(challenge)}
              >
                {challenge.challenge_name}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500">No Challenges Found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ChallengeStep;
