import React, { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  MapPinIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

const Signup = ({ setScreen }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    street: "",
    city: "",
  });

  const [alerts, setAlerts] = useState([]); // For error/success messages

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    // Count alphabets and numbers
    const alphaCount = (password.match(/[A-Za-z]/g) || []).length;
    const numberCount = (password.match(/[0-9]/g) || []).length;

    if (alphaCount < 4) {
      errors.push("Password must contain at least 4 alphabetic letters.");
    }
    if (numberCount < 2) {
      errors.push("Password must contain at least 2 numbers.");
    }

    return errors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Clear previous alerts
    setAlerts([]);

    // Validate username length
    if (formData.username.trim().length < 3) {
      setAlerts([
        {
          type: "error",
          message: "Username must be at least 3 characters long.",
        },
      ]);
      return;
    }

    // Validate phone number: 10 digits and starts with 9
    if (!/^9\d{9}$/.test(formData.phone)) {
      setAlerts([
        {
          type: "error",
          message: "Phone number must be 10 digits and start with 9.",
        },
      ]);
      return;
    }

    // Validate password
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setAlerts(passwordErrors.map((msg) => ({ type: "error", message: msg })));
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: formData.username,
          email: formData.email,
          contactNumber: formData.phone,
          password: formData.password,
          street: formData.street,
          city: formData.city,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlerts([
          { type: "success", message: "Signup successful! Please login." },
        ]);
        setTimeout(() => setScreen(false), 1500); // Switch to login screen after 1.5s
      } else {
        setAlerts([
          { type: "error", message: data.message || "Signup failed" },
        ]);
      }
    } catch (err) {
      setAlerts([
        { type: "error", message: "Something went wrong during signup." },
      ]);
      console.error(err);
    }
  };

  const inputClass =
    "w-full pl-10 pr-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm";

  const iconClass = "w-5 h-5 absolute left-3 top-2.5 text-gray-500 z-10";

  const renderInput = (icon, type, name, placeholder) => (
    <div className="relative">
      {icon}
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        className={inputClass}
        autoComplete="off"
      />
    </div>
  );

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      {renderInput(
        <UserIcon className={iconClass} />,
        "text",
        "username",
        "Username"
      )}
      {renderInput(
        <EnvelopeIcon className={iconClass} />,
        "email",
        "email",
        "Email"
      )}
      {renderInput(
        <PhoneIcon className={iconClass} />,
        "tel",
        "phone",
        "Phone"
      )}
      {renderInput(
        <LockClosedIcon className={iconClass} />,
        "password",
        "password",
        "Password"
      )}
      {renderInput(
        <MapPinIcon className={iconClass} />,
        "text",
        "street",
        "Street"
      )}
      {renderInput(
        <BuildingOfficeIcon className={iconClass} />,
        "text",
        "city",
        "City"
      )}

      {/* Alerts display above button */}
      <div className="min-h-[1.5rem]">
        {alerts.map((alert, index) => (
          <p
            key={index}
            className={`text-sm font-semibold ${
              alert.type === "error"
                ? "text-red-600"
                : alert.type === "success"
                ? "text-green-600"
                : "text-gray-800"
            }`}
          >
            {alert.message}
          </p>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
