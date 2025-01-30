import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import Challenges from "../components/dashboard/Challenges";
import { fetchConferenceById } from "../redux/features/conferences/conferencesActions";
import Skelleton from "../components/dashboard/Skelleton";

const ConferenceDetailPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const { selectedConference, loading } = useAppSelector(
    (state) => state.conferences
  );

  const { id } = useParams();

  useEffect(() => {
    if (id && user) {
      dispatch(fetchConferenceById(id));
    }
  }, [id, dispatch]);

  if (!loading && !selectedConference) {
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
      {loading ? (
        <Skelleton />
      ) : (
        <>
          {selectedConference && (
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
                    {selectedConference?.conference_name}
                  </h1>
                  <Calendar className="text-[#FF5722]" size={28} />
                </div>
                <div className="flex items-center mb-4">
                  <div className="">
                    <h2 className="text-[#FF5722] text-lg font-semibold mb-2">
                      Start Date
                    </h2>
                    <p className="text-white">
                      {new Date(
                        selectedConference?.start_date
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="ml-10">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <h2 className="text-[#FF5722] text-lg font-semibold">
                        Location
                      </h2>
                      <span>{selectedConference.location}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-[#FF5722] text-lg font-semibold mb-2">
                    Description
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedConference?.description}
                  </p>
                </div>
              </div>

              {id && <Challenges conferenceId={id} />}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ConferenceDetailPage;
