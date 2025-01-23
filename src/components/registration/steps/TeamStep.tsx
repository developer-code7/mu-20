import React, { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { fetchUsersBySchoolId } from "../../../redux/features/users/usersAction";

interface TeamStepProps {
  schoolId: string;
  teamName: string;
  teamMembers: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTeamMemberToggle: (userId: string) => void;
}

const TeamStep: React.FC<TeamStepProps> = ({
  schoolId,
  teamName,
  teamMembers,
  onChange,
  onTeamMemberToggle,
}) => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsersBySchoolId(schoolId));
    console.log(users);
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

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Select Team Members
        </h3>
        <div className="space-y-2">
          {schoolId &&
            !loading &&
            users?.map((user) => (
              <div key={user.user_id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`user-${user.user_id}`}
                  checked={teamMembers.includes(user.user_id)}
                  onChange={() => onTeamMemberToggle(user.user_id)}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`user-${user.user_id}`}
                  className="ml-2 text-sm text-gray-600"
                >
                  {user.full_name}
                </label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TeamStep;
