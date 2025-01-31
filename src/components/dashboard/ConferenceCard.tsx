import React from "react";
import { Calendar, Clock, ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formateDate";
import { Conference } from "../../types/type";
interface ConferenceCardProps {
  conference: Conference;
}

const ConferenceCard: React.FC<ConferenceCardProps> = ({ conference }) => {
  return (
    <div className="bg-[#1B2537] rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300  flex flex-col h-full">
      <div className="sm:p-6 p-3 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex sm:flex-row gap-1 flex-col  sm:items-center  mb-2 sm:mb-4">
              <div className="flex items-center gap-2 text-[#FF5722]">
                <Calendar size={18} />
                <span className="text-sm">
                  {formatDate(conference.start_date)}
                </span>
              </div>
              <div className="sm:ml-auto">
                <div className="flex items-center gap-2 text-white">
                  <MapPin size={18} className="text-[#FF5722] text-sm" />
                  <span>{conference.location}</span>
                </div>
              </div>
            </div>
            <h3 className="text-white sm:text-xl  font-semibold leading-tight">
              {conference.conference_name}
            </h3>
          </div>
        </div>
        <div className="flex items-center text-gray-400 sm:text-sm text-[10px]">
          <Clock size={16} className="mr-2" />
          <span>
            Registration closes on {formatDate(conference.start_date)}{" "}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-700/50 mt-auto">
        <Link
          to={`/dashboard/conference/${conference.conference_id}`}
          className="flex items-center justify-between p-4 text-[#FF5722] hover:bg-[#FF5722] hover:text-white transition-all duration-300 group"
        >
          <span className="font-medium text-sm">View Details</span>
          <ArrowRight
            size={18}
            className="transform group-hover:translate-x-1 transition-transform duration-300"
          />
        </Link>
      </div>
    </div>
  );
};

export default ConferenceCard;
