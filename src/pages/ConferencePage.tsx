import React from "react";
import ConferenceCard from "../components/dashboard/ConferenceCard";
import { conferences } from "../data/mockData";

const ConferencesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0F1729] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-3xl font-bold">Conferences</h1>
          <div className="text-gray-400">
            Showing {conferences.length} conferences
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {conferences.map((conference) => (
            <ConferenceCard key={conference.id} conference={conference} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConferencesPage;
