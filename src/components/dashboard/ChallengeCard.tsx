import { Calendar, Clock } from "lucide-react";
import { formatDate } from "../../utils/formateDate";
import { Challenge } from "../../types/type";
interface ChallengeCardProps {
  challenge: Challenge;
  handleClick: (
    id: string,
    alreadyRegistered: boolean,
    timeConflict: boolean
  ) => void;
}

const ChallengeCard = ({ challenge, handleClick }: ChallengeCardProps) => {
  return (
    <div
      key={challenge.challenge_id}
      className={`bg-gray-800 rounded-lg border ${
        challenge.already_registered
          ? "border-green-500/30 ring-1 ring-green-500/20"
          : challenge.time_conflict
          ? "border-gray-500/30 ring-1 ring-gray-500/20"
          : "border-gray-700 hover:border-orange-600"
      } sm:p-6 p-3 hover:border-opacity-100 transition-all duration-300 flex flex-col h-full relative group`}
    >
      <div className="flex items-start justify-between">
        <h3 className="sm:text-lg font-semibold text-white">
          {challenge.challenge_name}
        </h3>
        <Calendar
          className={`h-5 w-5  ${
            challenge.already_registered
              ? "text-green-500"
              : challenge.time_conflict
              ? "text-gray-500 "
              : "text-orange-500"
          }`}
        />
      </div>

      <div className="sm:mt-4 mt-2 space-y-3 sm:mb-6 mb-3">
        <div className="flex items-center sm:text-sm text-[10px] text-gray-400">
          <Clock className="sm:h-4 sm:w-4 h-3 w-3 mr-2" />
          <span className="">{`Registration closes on ${formatDate(
            challenge.start_date
          )} `}</span>
        </div>
      </div>

      <div className="relative mt-auto group">
        <button
          onClick={() =>
            handleClick(
              challenge.challenge_id,
              challenge.already_registered,
              challenge.time_conflict
            )
          }
          disabled={challenge.already_registered || challenge.time_conflict}
          className={`sm:text-lg text-sm w-full py-2 px-4 rounded-lg transition-colors ${
            challenge.already_registered
              ? "bg-green-500/20 text-green-500 cursor-not-allowed hover:bg-green-500/30"
              : challenge.time_conflict
              ? "bg-gray-500/20 text-white cursor-not-allowed hover:bg-gray-500/30"
              : "bg-orange-600 text-white hover:bg-orange-700"
          }`}
        >
          {challenge.already_registered ? "Already Registered" : "Register Now"}
        </button>

        {/* Tooltip for registration status */}
        {(challenge.already_registered || challenge.time_conflict) && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {challenge.already_registered
              ? "Already registered for this challenge"
              : "Time conflict with another registered challenge"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;
