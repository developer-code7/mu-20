import React from "react";

interface ReviewStepProps {
  formData: {
    challenge: {
      id: string;
      name: string;
    } | null;
    committee_preferences: {
      [key: string]: {
        committee_name: string;
        portfolio_preferences: { id: string; name: string }[];
      };
    };
    team_name: string;
    team_members: { id: string; name: string }[];
  };
  user: {
    user_id: string;
    fullName: string;
    school_id: string;
    email: string;
  };
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData, user }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Review Your Information
        </h3>
        <dl className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Name:</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {user.fullName}
            </dd>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Email:</dt>
            <dd className="text-sm text-gray-900 col-span-2">{user.email}</dd>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Challenge:</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {formData.challenge ? formData.challenge.name : "N/A"}
            </dd>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Team Name:</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {formData.team_name}
            </dd>
          </div>
        </dl>
      </div>

      {/* Committee Preferences */}
      {formData.committee_preferences &&
        Object.entries(formData.committee_preferences).length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Committee Preferences
            </h3>
            {Object.entries(formData.committee_preferences).map(
              ([committeeId, { committee_name, portfolio_preferences }]) => (
                <div key={committeeId} className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    {committee_name}
                  </h4>
                  <ul className="ml-4 mt-1">
                    {portfolio_preferences.map(
                      ({ portfolio_id, portfolio_name }) => (
                        <li
                          key={portfolio_id}
                          className="text-sm text-gray-600"
                        >
                          {portfolio_name}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )
            )}
          </div>
        )}

      {/* Team Members */}
      {formData.team_members && formData.team_members.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Team Members
          </h3>
          <ul className="space-y-2">
            {formData.team_members.map(({ user_id, full_name }) => (
              <li key={user_id} className="text-sm text-gray-600">
                {full_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReviewStep;
