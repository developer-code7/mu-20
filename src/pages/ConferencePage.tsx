import React, { useEffect } from "react";
import ConferenceCard from "../components/dashboard/ConferenceCard";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchConferences } from "../redux/features/conferences/conferencesActions";
import Skelleton from "../components/dashboard/Skelleton";

const ConferencesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { conferences, loading } = useAppSelector((state) => state.conferences);

  useEffect(() => {
    dispatch(fetchConferences());
  }, []);
  return (
    <div className="min-h-screen bg-[#000000] sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex sm:flex-row flex-col sm:items-center justify-between mb-8 ">
          <h1 className="text-white sm:text-3xl text-xl font-bold uppercase">
            Conference
          </h1>
          <div className="text-gray-400 sm:text-lg text-sm">
            Showing {conferences.length} conferences
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading &&
            [...Array(6)].map((_, index) => <Skelleton key={index} />)}

          {!loading && conferences.length > 0
            ? conferences.map((conference) => (
                <ConferenceCard
                  key={conference.id}
                  conference={conference}
                />
              ))
            : !loading && (
                <div className="text-gray-400">No Active Conferences Found</div>
              )}
        </div>
      </div>
    </div>
  );
};

export default ConferencesPage;
