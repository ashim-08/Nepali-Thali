import React, { useEffect, useState } from "react";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const MainAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const screen = queryParams.get("screen"); // 'login' or 'signup'

  const [isSignup, setIsSignup] = useState(screen === "signup");

  // Update state if URL changes dynamically
  useEffect(() => {
    setIsSignup(screen === "signup");
  }, [screen]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white px-4 mt-5">
        <div className="w-full max-w-md bg-white border border-black rounded-2xl shadow-xl p-6">
          <div className="flex flex-col items-center mb-4">
            <img src="logo.png" alt="Logo" className="h-20 w-20" />
            <h1 className="text-2xl font-bold text-black mt-2">NepaliThali</h1>
            <p className="text-sm text-gray-500">
              {isSignup
                ? "Create a delicious journey."
                : "Login to taste the best!"}
            </p>
          </div>

          {isSignup ? (
            <Signup setScreen={setIsSignup} />
          ) : (
            <Login setScreen={setIsSignup} />
          )}

          {/* Switch Mode */}
          <div className="text-sm text-center mt-4 text-black">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setIsSignup(false);
                    navigate("/auth?screen=login");
                  }}
                  className="text-orange-600 hover:underline font-medium cursor-pointer"
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => {
                    setIsSignup(true);
                    navigate("/auth?screen=signup");
                  }}
                  className="text-orange-600 hover:underline font-medium cursor-pointer"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-5 py-2 rounded-full shadow-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2"
      >
        <FaArrowLeft /> Go to Home
      </button>
    </>
  );
};

export default MainAuth;
