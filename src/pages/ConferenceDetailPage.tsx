import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Challenges from "../components/dashboard/Challenges";
import { fetchConferenceById } from "../redux/features/conferences/conferencesActions";
import Skelleton from "../components/dashboard/Skelleton";
import { formatDate } from "../utils/formateDate";
import conference_image from "../../assets/conferencebg.jpg";
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
      <div className="min-h-screen bg-[#000000] sm:p-8 p-4 text-white">
        <div className="sm:max-w-5xl mx-auto">
          <h1>Conference not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] sm:p-8  ">
      {loading ? (
        <Skelleton />
      ) : (
        <>
          {selectedConference && (
            <div className="sm:max-w-7xl mx-auto">
              <Link
                to="/dashboard"
                className="inline-flex items-center text-[#FF5722] hover:text-[#F4511E] mb-6"
              >
                <ArrowLeft size={20} className="mr-2 text-white" />
                Back to Conferences
              </Link>

              <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${conference_image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#00000065] to-transparent z-10"></div>
                </div>

                <div className="relative z-20 h-full container mx-auto px-4 flex flex-col justify-end">
                  <h1 className="text-white text-4xl md:text-5xl font-bold uppercase">
                    {selectedConference.name}
                  </h1>

                  <div className="">
                    <div className="flex gap-10 items-center my-2">
                      <div>
                        <h2 className="text-[#EA580C] font-bold uppercase text-sm ">
                          Start Date
                        </h2>
                        <p className="text-white font-bold">
                          {formatDate(selectedConference.start_date)}
                        </p>
                      </div>

                      <div>
                        <h2 className="text-[#EA580C] font-bold uppercase text-sm ">
                          Location
                        </h2>
                        <p className="text-white font-bold">
                          {selectedConference.location}
                        </p>
                      </div>
                    </div>

                    <div className="max-w-4xl">
                      <h2 className="text-[#EA580C] font-bold uppercase text-sm  mb-1">
                        Description
                      </h2>
                      <p className="text-white text-lg leading-relaxed">
                        {selectedConference.description}
                      </p>
                    </div>
                  </div>
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
