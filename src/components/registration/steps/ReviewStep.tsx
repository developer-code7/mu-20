import React from "react";
import { User } from "../../../types/type";
interface ReviewStepProps {
  formData: {
    challenge: {
      id: string;
      name: string;
    } | null;
    committee_preferences: {
      [key: string]: {
        committee_name: string;
        portfolio_preferences: {
          portfolio_id: string;
          portfolio_name: string;
        }[];
      };
    };
    team_name: string;
    team_members: { user_id: string; full_name: string }[];
  };
  user: User | null;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData, user }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#222222] p-4 rounded-lg border border-[#D4D7E3]">
        <h3 className="text-lg font-bold text-white mb-4">
          Review Your Information
        </h3>
        <dl className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-white">Name:</dt>
            <dd className="text-sm text-white font-bold col-span-2">
              {user?.full_name}
            </dd>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-white">Email:</dt>
            <dd className="text-sm text-white font-bold col-span-2">
              {user?.email}
            </dd>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-white">Challenge:</dt>
            <dd className="text-sm text-white font-bold col-span-2">
              {formData.challenge ? formData.challenge.name : "N/A"}
            </dd>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-white">Team Name:</dt>
            <dd className="text-sm text-white font-bold col-span-2">
              {formData.team_name}
            </dd>
          </div>
        </dl>
      </div>

      {/* Committee Preferences */}

      {formData.committee_preferences &&
        Object.entries(formData.committee_preferences).length > 0 && (
          <div className="bg-[#222222] border border-[#D4D7E3] p-4 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-4">
              Committee Preferences
            </h3>
            <div className="max-h-[100px] overflow-y-scroll no-scrollbar">
              {Object.entries(formData.committee_preferences).map(
                ([committeeId, { committee_name, portfolio_preferences }]) => (
                  <div key={committeeId} className="mb-4">
                    <h4 className="text-sm font-bold text-white">
                      {committee_name}
                    </h4>
                    <ul className="ml-4 mt-1">
                      {portfolio_preferences.map(
                        ({ portfolio_id, portfolio_name }) => (
                          <li key={portfolio_id} className="text-sm text-white">
                            {portfolio_name}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        )}

      {/* Team Members */}
      {formData.team_members && formData.team_members.length > 0 && (
        <div className="bg-[#222222] border border-[#D4D7E3] p-4 rounded-lg">
          <h3 className="text-lg  text-white font-bold mb-4">Team Members</h3>
          <ul className="space-y-2">
            {formData.team_members.map(({ user_id, full_name }) => (
              <li key={user_id} className="text-sm text-white">
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
