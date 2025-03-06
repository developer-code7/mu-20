import { Calendar, Clock, MoveRight, Users } from "lucide-react";
import { ChallengeRegistration } from "../../types/type";
import { formatDate } from "../../utils/formateDate";

interface UserChallengeCardProps {
  challenge: ChallengeRegistration;
  activeTab: string;
  onViewDetails: (challenge: ChallengeRegistration) => void;
}
const UserChallengeCard: React.FC<UserChallengeCardProps> = ({
  challenge,
  activeTab,
  onViewDetails,
}) => {
  console.log(challenge);
  return (
    <div
      key={challenge?.registration_details?.challenge_id}
      className="border border-gray-700 rounded-lg p-4 hover:border-orange-500 transition-colors flex flex-col h-full max-w-[400px]"
    >
      <div className="flex flex-col justify-normal w-full">
        <div className="flex items-center">
          <h3 className="sm:text-xl text-sm font-bold text-white uppercase">
            {challenge?.challenge_details?.name}
          </h3>
          {activeTab === "upcoming" ? (
            <div className="sm:px-3 sm:py-1 px-2   bg-green-900 text-green-300 sm:text-sm text-[10px] font-medium rounded-full  ml-auto">
              Active
            </div>
          ) : (
            <div className="sm:px-3 sm:py-1 px-2  bg-purple-900 text-purple-300 sm:text-sm text-[10px] font-medium rounded-full ml-auto">
              Completed
            </div>
          )}
        </div>
        <div className="mt-2 space-y-2">
          <div className="flex items-center font-bold sm:text-sm text-[10px] text-white">
            <Users className="sm:h-4 sm:w-4 mr-2 h-3 w-3 text-[#EA570B]" />
            <span>Team: {challenge?.team_details?.name}</span>
          </div>
          <div className="flex items-center font-bold sm:text-sm text-[10px] text-white">
            <Calendar className="sm:h-4 sm:w-4 mr-2 h-3 w-3 text-[#EA570B]" />
            <span>
              {activeTab === "upcoming" ? (
                <>
                  Starts: {formatDate(challenge?.challenge_details?.start_date)}
                </>
              ) : (
                <>
                  Ended On: {formatDate(challenge?.challenge_details?.end_date)}
                </>
              )}
            </span>
          </div>
          <div className="flex items-center font-bold sm:text-sm text-[10px] text-white">
            <Clock className="sm:h-4 sm:w-4 mr-2 h-3 w-3 text-[#EA570B]" />
            <span>
              Registered On:{" "}
              {formatDate(challenge?.registration_details?.registration_date)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:mt-4 mt-2 text-[#EA580C]">
        <button
          className="text-[#EA580C] sm:text-sm text-[12px] font-medium"
          onClick={() => onViewDetails(challenge)}
        >
          {activeTab === "upcoming" ? "View Details" : "View Results"}
        </button>
        <MoveRight className="sm:h-6 sm:w-6 h-4 w-4 sm:mt-1" />
      </div>
    </div>
  );
};

export default UserChallengeCard;
