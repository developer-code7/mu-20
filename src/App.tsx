import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase.client";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { setAuthUser, clearAuthState } from "./redux/features/auth/authSlice";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import ChallengeRegisteration from "./pages/ChallengeRegisteration";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import CongratulationsModal from "./components/CongratulationsModal";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        const { data: userData, error } = await supabase
          .from("users")
          .select("*")
          .eq("auth_id", session.user.id)
          .single();

        if (!error) {
          dispatch(
            setAuthUser({
              id: userData.user_id,
              authId: userData.auth_id,
              email: userData.email,
              fullName: userData.full_name,
              schoolId: userData.school_id,
            })
          );

          navigate("/dashboard");
        }
      } else {
        dispatch(clearAuthState());
        navigate("/login");
        throw new Error(error?.message);
      }
    };

    fetchUserSession();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLoading = (val: boolean) => {
    setIsLoading(val);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <CongratulationsModal isOpen={isModalOpen} onClose={closeModal} />
      {isLoading && <Loader fullScreen={true} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="conference/:conferenceId/challenge-register/:id"
          element={
            <PrivateRoute>
              <ChallengeRegisteration
                openModal={openModal}
                handleLoading={handleLoading}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>

      <Toaster
        reverseOrder={true}
        position="top-right"
        toastOptions={{
          error: {
            style: { borderRadius: "0", color: "red" },
          },
          success: {
            style: { borderRadius: "0", color: "green" },
          },
          duration: 2000,
        }}
      />
    </div>
  );
}

export default App;
