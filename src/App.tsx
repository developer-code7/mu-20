import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ChallengeRegisteration from "./pages/ChallengeRegisteration";
import Register from "./pages/Register";
// import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/challenge-register"
            // element={
            //   <PrivateRoute>
            //     <ChallengeRegisteration />
            //   </PrivateRoute>
            // }

            element={<ChallengeRegisteration />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
