import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { fetchUsersBySchoolId } from "../../../redux/features/users/usersAction";
import { ChevronDown, ChevronUp, X } from "lucide-react";


interface TeamStepProps {
  schoolId: string | null;
  teamLeader: {
    id: string;
    email: string;
    fullName: string;
    schoolId: string;
  } | null;
  selectedChallenge: { id: string; name: string; team_size: number | 1 } | null;
  teamName: string;
  teamMembers: TeamMembers[]; // Updated to store user objects
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTeamMemberToggle: (user: { user_id: string; full_name: string }) => void; // Updated to pass full user object
}

const TeamStep: React.FC<TeamStepProps> = ({
  schoolId,
  teamLeader,
  teamName,
  teamMembers,
  onChange,
  onTeamMemberToggle,
  selectedChallenge,
}) => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state: RootState) => state.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<TeamMembers[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (schoolId && selectedChallenge && selectedChallenge.team_size > 1) {
      dispatch(
        fetchUsersBySchoolId({
          input_challenge_id: selectedChallenge.id,
          input_school_id: schoolId,
        })
      );
    }
  }, [dispatch, schoolId, selectedChallenge]);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.user_id !== teamLeader?.id &&
          user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

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

  return (
    <div className="space-y-6" ref={dropdownRef}>
      <div>
        <label className="text-lg block font-medium text-gray-700 mb-2">
          Team Name
          <span>{selectedChallenge?.team_size === 1 ? " (Optional)" : ""}</span>
        </label>
        <input
          type="text"
          name="team_name"
          value={teamName}
          onChange={onChange}
          className="block w-full px-3 py-2 border outline-orange-600 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter team name"
          required
        />
      </div>

      {selectedChallenge && selectedChallenge?.team_size > 1 && (
        <div className="relative">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select Team Members
          </h3>
          <div className=" py-2 flex items-center border border-gray-300 rounded-md shadow-sm  focus-within:border-orange-500">
            <input
              type="text"
              placeholder={`${dropdownOpen ? "Search" : "Select"} Team Members`}
              className="w-full px-3 outline-none focus:outline"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setDropdownOpen(true)}
            />

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
            <div className="p-2 absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-auto mt-1 overflow-y-scroll h-[100px]">
              {loading ? (
                <p className="px-3 py-2 text-gray-500">Loading...</p>
              ) : (
                filteredUsers?.map((user) => {
                  if (user.user_id === teamLeader?.id) return null;
                  else
                    return (
                      <div
                        key={user.user_id}
                        className="flex items-center text-lg"
                      >
                        <input
                          type="checkbox"
                          id={`user-${user.user_id}`}
                          checked={teamMembers?.some(
                            (member) => member.user_id === user.user_id
                          )} // Check if user is in the team
                          onChange={() =>
                            onTeamMemberToggle({
                              user_id: user.user_id,
                              full_name: user.full_name,
                            })
                          }
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`user-${user.user_id}`}
                          className="ml-2 text-gray-600"
                        >
                          {user.full_name}
                        </label>
                      </div>
                    );
                })
              )}
            </div>
          )}

          {teamMembers.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-2 text-[12px]">
              {teamMembers?.map((member) => (
                <div
                  key={member.user_id}
                  className="flex gap-2 items-center border border-orange-600 bg-gray-10 rounded-lg p-1"
                >
                  <p>{member.full_name}</p>
                  <X
                    onClick={() =>
                      onTeamMemberToggle({
                        user_id: member.user_id,
                        full_name: member.full_name,
                      })
                    }
                    className="hover:text-orange-600 cursor-pointer"
                    size={15}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamStep;
