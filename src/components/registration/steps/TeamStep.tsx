import React, { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { fetchUsersBySchoolId } from "../../../redux/features/users/usersAction";

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
  teamMembers: { user_id: string; full_name: string }[]; // Updated to store user objects
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

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchUsersBySchoolId(schoolId));
    }
  }, [dispatch, schoolId]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Team Name
        </label>
        <input
          type="text"
          name="team_name"
          value={teamName}
          onChange={onChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter team name"
          required
        />
      </div>

      {selectedChallenge?.team_size > 1 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Select Team Members
          </h3>
          <div className="space-y-2">
            {schoolId &&
              !loading &&
              users?.map((user) => {
                if (user.user_id === teamLeader?.id) return null;
                else
                  return (
                    <div key={user.user_id} className="flex items-center">
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
                        className="ml-2 text-sm text-gray-600"
                      >
                        {user.full_name}
                      </label>
                    </div>
                  );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamStep;
