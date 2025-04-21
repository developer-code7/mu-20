import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { loginUser } from "../redux/features/auth/authAction";
import mainLogo from "../../assets/main-logo.png";
import loginbg from "../../assets/loginbg.png";
import { Eye, EyeOff } from "lucide-react";
import login from "../../assets/login.png";
import Register from "./Register";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(loginUser({ email, password }));

    navigate("/dashboard");
  };

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {isLogin ? (
        <div className="min-h-screen w-full flex relative overflow-hidden">
          {/* Left half - Background Image */}
          <div
            className="absolute top-0 left-0 w-[60%] h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${loginbg})`,
            }}
          ></div>

          {/* Slanted divider */}

          {/* Right half - Pattern Background */}
          <div className=" absolute top-0 right-0 w-[50%] h-full bg-black">
            <div
              className="w-full h-full opacity-20"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1429&q=80")',
                backgroundSize: "cover",
                backgroundBlendMode: "overlay",
              }}
            ></div>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-5xl mx-auto my-auto p-4 z-10">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row">
              {/* Left side - Image */}
              <div className="p-3  md:w-1/2 h-64 md:h-auto hidden sm:flex">
                <img
                  src={login}
                  alt="Auditorium with audience"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Right side - Login Form */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col ">
                <img
                  src={mainLogo}
                  alt="logo"
                  className="mb-8 w-[250px] h-[85px] ml-auto mr-auto"
                />
                <h1 className="text-2xl font-bold mb-2">Welcome Back 👋</h1>
                <p className="text-gray-600 mb-6">
                  Today is a new day. It's your day. You shape it.
                  <br />
                  Sign in to start managing your projects.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col">
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                        minLength={8}
                      />

                      {/* Toggle button */}
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center text-gray-500 hover:text-gray-700 text-sm"
                      >
                        {showPassword ? (
                          <>
                            <EyeOff className="h-5 w-5 mr-1" />
                            Hide
                          </>
                        ) : (
                          <>
                            <Eye className="h-5 w-5 mr-1" />
                            Show
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end mb-6">
                    <p className="text-sm text-gray-600 mr-auto">
                      Don't have an account?{" "}
                      <button
                        onClick={() => setIsLogin(false)}
                        className="font-medium text-[#1E4AE9]"
                      >
                        Register
                      </button>
                    </p>
                    <a href="#" className="text-sm text-[#1E4AE9]">
                      Forgot Password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Register handleSignIn={() => setIsLogin(true)} />
      )}
    </>
  );
};

export default Login;
