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

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserSession = async () => {
      const {
        data: { session },
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
      }
    };

    fetchUserSession();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <CongratulationsModal isOpen={isModalOpen} onClose={closeModal} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/challenge-register/:id"
          element={
            <PrivateRoute>
              <ChallengeRegisteration openModal={openModal} />
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
    </div>
  );
}

export default App;
