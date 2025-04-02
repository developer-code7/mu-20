import React from "react";
import { X, Users, Calendar, Clock, Building2, Check } from "lucide-react";

interface Portfolio {
  portfolio_id: string;
  portfolio_name: string;
}

interface Committee {
  portfolios: Portfolio[];
  committee_id: string;
  committee_name: string;
}

interface AllotmentDetails {
  committee_id: string;
  committee_name: string;
  portfolio_id: string;
  portfolio_name: string;
}

interface TeamMember {
  email: string;
  user_id: string;
  full_name: string;
}

interface UserChallenge {
  registration_details: {
    status: boolean;
    team_id: string;
    user_id: string;
    challenge_id: string;
    registration_id: string;
    registration_date: string;
    allotment_status: boolean;
  };
  challenge_details: {
    end_date: string;
    is_active: boolean;
    start_date: string;
    preferences?: Committee[];
    challenge_id: string;
    challenge_name: string;
    challenge_type: string;
  };
  team_details: {
    team_id: string;
    team_name: string;
    team_members: TeamMember[];
  };
  allotment_details: AllotmentDetails[] | null;
}

interface ChallengeDetailModalProps {
  userChallenge: UserChallenge;
  onClose: () => void;
}

const ChallengeDetailModal: React.FC<ChallengeDetailModalProps> = ({
  userChallenge,
  onClose,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-black rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white uppercase">
                {userChallenge.challenge_details.challenge_name}
              </h2>
              <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                {userChallenge.challenge_details.is_active
                  ? "Active"
                  : "Inactive"}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Challenge Info */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-white font-bold">
                <Calendar className="text-[#EA580C]" size={20} />
                <div>
                  <p className="text-sm font-normal">Start Date</p>
                  <p>
                    {formatDate(userChallenge.challenge_details.start_date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white font-bold">
                <Calendar className="text-[#EA580C]" size={20} />
                <div>
                  <p className="text-sm font-normal">End Date</p>
                  <p>{formatDate(userChallenge.challenge_details.end_date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white font-bold">
                <Clock className="text-[#EA580C]" size={20} />
                <div>
                  <p className="text-sm font-normal">Registration Date</p>
                  <p>
                    {formatDate(
                      userChallenge.registration_details.registration_date
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white font-bold">
                {userChallenge.registration_details?.allotment_status ? (
                  <Check className="text-[#EA580C]" size={20} />
                ) : (
                  <Clock className="text-[#EA580C]" size={20} />
                )}
                <div>
                  <p className="text-sm font-normal">Allotment</p>
                  {userChallenge.registration_details.allotment_status ? (
                    <div>
                      {userChallenge.allotment_details?.map((detail) => (
                        <div key={detail.portfolio_id}>
                          <p className="text-sm font-normal">
                            Committee:{" "}
                            <span className="text-white font-bold">
                              {detail.committee_name}
                            </span>
                          </p>
                          <p className="text-sm font-normal">
                            Portfolio:{" "}
                            <span className="text-white font-bold">
                              {detail.portfolio_name}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p> Pending</p>
                  )}
                </div>
              </div>
            </div>

            {/* Team Details */}
            {userChallenge.team_details.team_members.length > 1 && (
              <div className="border-t border-gray-700/50 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="text-[#EA580C]" size={20} />
                  <h3 className="text-lg font-semibold text-white">
                    Team Details
                  </h3>
                </div>
                <div className="bg-[#222222] rounded-lg p-4">
                  <p className="text-white font-bold mb-3">
                    Team Name: {userChallenge.team_details.team_name}
                  </p>
                  <div className="space-y-2">
                    {userChallenge.team_details.team_members.map((member) => (
                      <div
                        key={member.user_id}
                        className="flex items-center justify-between text-sm text-white bg-[#535353] p-2 rounded"
                      >
                        <span>{member.full_name}</span>
                        <span className="text-white">{member.email}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Section - Only show if preferences exist */}
            {userChallenge.challenge_details.preferences &&
              userChallenge.challenge_details.preferences.length > 0 && (
                <div className="border-t border-gray-700/50 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="text-[#EA580C]" size={20} />
                    <h3 className="text-lg font-semibold text-white">
                      Preferences
                    </h3>
                  </div>
                  <div className="space-y-4 max-h-[200px] overflow-y-scroll no-scrollbar">
                    {userChallenge.challenge_details.preferences.map(
                      (committee) => (
                        <div
                          key={committee.committee_id}
                          className="bg-[#222222] rounded-lg p-4"
                        >
                          <h4 className="text-white font-bold mb-2">
                            {committee.committee_name}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {committee.portfolios.map((portfolio) => (
                              <span
                                key={portfolio.portfolio_id}
                                className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-black border border-[#EA580C] text-white"
                              >
                                {portfolio.portfolio_name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailModal;
