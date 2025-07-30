import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [prevPassword, setPrevPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [alerts, setAlerts] = useState([]);

  const token = localStorage.getItem("authToken");

  const validate = () => {
    const errs = [];
    if (currentPassword.length < 6) {
      errs.push({ type: "error", message: "Password must be ≥ 6 characters." });
    }
    const alphaCount = (currentPassword.match(/[A-Za-z]/g) || []).length;
    const digitCount = (currentPassword.match(/[0-9]/g) || []).length;
    if (alphaCount < 4)
      errs.push({ type: "error", message: "New password needs ≥ 4 letters." });
    if (digitCount < 2)
      errs.push({ type: "error", message: "New password needs ≥ 2 digits." });
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerts([]);

    const validationErrors = validate();
    if (validationErrors.length) {
      setAlerts(validationErrors);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prevPassword, currentPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlerts([{ type: "success", message: data.message }]);
        setPrevPassword("");
        setCurrentPassword("");
      } else {
        setAlerts([
          { type: "error", message: data.message || "Update failed." },
        ]);
      }
    } catch (err) {
      setAlerts([{ type: "error", message: "Network error." }]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Account Settings
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              value={prevPassword}
              onChange={(e) => setPrevPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {alerts.map((a, idx) => (
            <p
              key={idx}
              className={`text-sm font-medium ${
                a.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {a.message}
            </p>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
        >
          Update Password
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Settings;
