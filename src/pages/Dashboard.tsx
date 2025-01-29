import React, { useState, useRef, useEffect } from "react";
import { Layout, Trophy, Award, Settings, Bell, User } from "lucide-react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Challenges from "../components/dashboard/Challenges";
import YourChallenges from "../components/dashboard/YourChallenges";
import DashboardSettings from "../components/dashboard/DashboardSettings";
import ConferencesPage from "./ConferencePage";
import ConferenceDetailPage from "./ConferenceDetailPage";

const Dashboard = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-800 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Layout className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-2xl font-bold text-white">MU20</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-orange-500"></span>
                </button>
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg py-2 z-20 border border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <h3 className="text-sm font-semibold text-white">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-700">
                        <p className="text-sm text-gray-300">
                          New challenge registration open
                        </p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
                >
                  <User className="h-6 w-6" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-20 border border-gray-700">
                    <Link
                      to="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      Profile Settings
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      onClick={() => {
                        /* Add logout logic */
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 z-20 h-[calc(100vh-4rem)] bg-gray-800 transition-all duration-300 ease-in-out group hover:w-64 w-16">
          <div className="h-full flex flex-col py-4">
            <nav className="flex-1">
              <div className="space-y-1">
                <Link
                  to="/dashboard/conferences"
                  className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors group"
                >
                  <Trophy className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Conferences
                  </span>
                </Link>
                <Link
                  to="/dashboard/your-challenges"
                  className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors group"
                >
                  <Award className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Your Challenges
                  </span>
                </Link>
              </div>
            </nav>

            <div className="border-t border-gray-700">
              <Link
                to="/dashboard/settings"
                className="flex items-center px-4 py-3 mt-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors group"
              >
                <Settings className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Settings
                </span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-16 p-6">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="conferences" element={<ConferencesPage />} />
              <Route path="conference/:id" element={<ConferenceDetailPage />} />
              <Route path="your-challenges" element={<YourChallenges />} />
              <Route path="settings" element={<DashboardSettings />} />
              <Route
                path=""
                element={<Navigate to="/dashboard/conferences" replace />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
