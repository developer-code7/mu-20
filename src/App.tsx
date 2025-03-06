import { useEffect, useState } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import ChallengeRegisteration from "./pages/ChallengeRegisteration";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import CongratulationsModal from "./components/CongratulationsModal";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from "./redux/features/auth/authAction";
function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const helper = async () => {
      const response = await dispatch(getCurrentUser());
      
      if (response?.payload) navigate("/dashboard");
      else navigate("/login");
    };

    helper();
  }, [dispatch]);

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
    <div className="min-h-screen bg-[#000000]">
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
