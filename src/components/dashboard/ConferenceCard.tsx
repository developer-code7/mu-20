import React from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
interface Conference {
  id: string;
  title: string;
  registrationClosesIn: number;
  description: string;
  startDate: string;
}
interface ConferenceCardProps {
  conference: Conference;
}

const ConferenceCard: React.FC<ConferenceCardProps> = ({ conference }) => {
  return (
    <div className="bg-[#1B2537] rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300  flex flex-col h-full">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[#FF5722] mb-2">
              <Calendar size={18} />
              <span className="text-sm">
                {new Date(conference.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <h3 className="text-white text-xl font-semibold leading-tight">
              {conference.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center text-gray-400 text-sm ">
          <Clock size={16} className="mr-2" />
          <span>
            Registration closes in {conference.registrationClosesIn} days
          </span>
        </div>
      </div>

      <div className="border-t border-gray-700/50 mt-auto">
        <Link
          to={`/dashboard/conference/${conference.id}`}
          className="flex items-center justify-between p-4 text-[#FF5722] hover:bg-[#FF5722] hover:text-white transition-all duration-300 group"
        >
          <span className="font-medium">View Details</span>
          <ArrowRight
            size={20}
            className="transform group-hover:translate-x-1 transition-transform duration-300"
          />
        </Link>
      </div>
    </div>
  );
};

export default ConferenceCard;
