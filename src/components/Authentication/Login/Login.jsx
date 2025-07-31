import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa"; // Ensure react-icons is installed: npm install react-icons

const Login = ({ setScreen }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("authToken", data.response);
        localStorage.setItem("userName", userName); // <--- This line saves the username
        setSuccess("Login successful!");
        // Redirect after a short delay to allow state updates/rendering
        setTimeout(() => (window.location.href = "/"), 1000);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong during login.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white p-6 rounded space-y-5 w-full max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-bold text-center text-orange-600">Login</h2>

      <div className="relative">
        <FaUser className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Username"
          className="pl-10 pr-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>

      <div className="relative">
        <FaLock className="absolute left-3 top-3 text-gray-500" />
        <input
          type="password"
          placeholder="Password"
          className="pl-10 pr-3 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm text-center">{success}</p>
      )}

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
