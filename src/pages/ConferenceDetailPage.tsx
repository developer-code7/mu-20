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
      <div className="min-h-screen bg-[#0F1729] sm:p-8 p-4 text-white">
        <div className="sm:max-w-5xl mx-auto">
          <h1>Conference not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1729] sm:p-8  ">
      {loading ? (
        <Skelleton />
      ) : (
        <>
          {selectedConference && (
            <div className="sm:max-w-5xl mx-auto">
              <Link
                to="/dashboard"
                className="inline-flex items-center text-[#FF5722] hover:text-[#F4511E] mb-6"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Conferences
              </Link>

              <div className="bg-[#1B2537] rounded-lg sm:p-8 p-4">
                <div className="flex justify-between items-start sm:mb-6 mb-4">
                  <h1 className="text-white sm:text-3xl text-lg font-bold">
                    {selectedConference?.conference_name}
                  </h1>
                  <Calendar className="text-[#FF5722]" size={28} />
                </div>
                <div className="flex sm:flex-row flex-col gap-2 sm:items-center mb-4">
                  <div className="flex flex-col items-start">
                    <h2 className="text-[#FF5722] sm:text-sm font-semibold sm:mb-2">
                      Start Date
                    </h2>
                    <p className="text-white sm:text-lg text-sm">
                      {new Date(
                        selectedConference?.start_date
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col items-start  text-white">
                    <h2 className="text-[#FF5722] sm:text-sm font-semibold sm:mb-2">
                      {" "}
                      Location
                    </h2>
                    <p className="text-white sm:text-lg text-sm">
                      {selectedConference.location}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-[#FF5722] sm:text-lg font-semibold mb-2">
                    Description
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
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
