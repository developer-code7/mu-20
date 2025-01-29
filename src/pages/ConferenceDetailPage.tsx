import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { conferences } from "../data/mockData";
import Challenges from "../components/dashboard/Challenges";

const ConferenceDetailPage: React.FC = () => {
  const { id } = useParams();
  const conference = conferences.find((c) => c.id === id);

  if (!conference) {
    return (
      <div className="min-h-screen bg-[#0F1729] p-8 text-white">
        <div className="max-w-5xl mx-auto">
          <h1>Conference not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1729] p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-[#FF5722] hover:text-[#F4511E] mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Conferences
        </Link>

        <div className="bg-[#1B2537] rounded-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-white text-3xl font-bold">
              {conference.title}
            </h1>
            <Calendar className="text-[#FF5722]" size={28} />
          </div>

          <div className="mb-6">
            <h2 className="text-[#FF5722] text-lg font-semibold mb-2">
              Start Date
            </h2>
            <p className="text-white">
              {new Date(conference.startDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div>
            <h2 className="text-[#FF5722] text-lg font-semibold mb-2">
              Description
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {conference.description}
            </p>
          </div>
        </div>

        <Challenges />
      </div>

      
    </div>
  );
};

export default ConferenceDetailPage;
