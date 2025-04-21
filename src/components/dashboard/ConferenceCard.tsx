import React from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formateDate";
import { Conference } from "../../types/type";
import conference_image from "../../../assets/conference.png";
import dayjs from "dayjs";
interface ConferenceCardProps {
  conference: Conference;
}

const ConferenceCard: React.FC<ConferenceCardProps> = ({ conference }) => {
  const isExpired = dayjs().isAfter(dayjs(conference.end_date).endOf("day"));
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (isExpired) {
      e.preventDefault();
    } else {
      navigate(`/dashboard/conference/${conference.id}`);
    }
  };

  return (
    <div className="relative w-full max-w-xs rounded-2xl overflow-hidden shadow-lg group">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
      <img
        src={conference_image}
        alt={conference.name}
        className="w-full h-full object-cover absolute inset-0"
      />

      {/* Content Container */}
      <div className="relative z-20 h-80 p-4 flex flex-col justify-end text-white">
        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded flex items-center space-x-1">
          <div className={`${!isExpired ? "bg-teal-500" : "bg-red-500"} p-1 rounded`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-xs font-medium">
            {formatDate(conference.start_date)}
          </span>
        </div>

        {/* Location Badge */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded flex items-center space-x-1">
          <div className="bg-gray-800 p-1 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <span className="text-xs font-medium">{conference.location}</span>
        </div>

        {/* Title and Info */}
        <h3 className="text-xl font-bold uppercase mb-1 leading-tight">
          {conference.name}
        </h3>
        <p className="text-sm text-gray-300 mb-3">
          Registration Closes on {formatDate(conference.start_date)}
        </p>

        {/* View Details Link */}
        <button
          onClick={handleClick}
          className={`flex items-center text-sm font-medium transition-all ${
            isExpired
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#EA580C] group-hover:text-[#ea4f0c] group-hover:font-bold"
          }`}
        >
          View Details
          <ArrowRight
            className={`ml-auto h-4 w-4 transition-transform ${
              !isExpired ? "group-hover:translate-x-1" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ConferenceCard;
