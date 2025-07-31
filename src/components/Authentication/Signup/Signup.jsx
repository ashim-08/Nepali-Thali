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

  const [alerts, setAlerts] = useState([]);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }
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

  const isFormComplete = () => {
    return (
      formData.username.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.password.trim() &&
      formData.street.trim() &&
      formData.city.trim() &&
      agreed
    );
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setAlerts([]);
    if (!agreed) {
      setAlerts([
        { type: "error", message: "You must agree to Terms & Policy." },
      ]);
      return;
    }
    if (formData.username.trim().length < 3) {
      setAlerts([
        {
          type: "error",
          message: "Username must be at least 3 characters long.",
        },
      ]);
      return;
    }
    if (!/^9\d{9}$/.test(formData.phone)) {
      setAlerts([
        {
          type: "error",
          message: "Phone number must be 10 digits and start with 9.",
        },
      ]);
      return;
    }
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
        setTimeout(() => setScreen(false), 1500);
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
    "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm transition duration-200 ease-in-out";

  const iconClass = "w-5 h-5 absolute left-3 top-2.5 text-gray-400";

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
    <form onSubmit={handleSignup} className="space-y-5">
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

      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
          className="w-4 h-4 mt-1 cursor-pointer text-orange-500 border-gray-300 rounded focus:ring-orange-400"
        />
        <label htmlFor="terms" className="text-sm select-none text-gray-700">
          I agree to the{" "}
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 underline hover:text-orange-600"
          >
            Terms and Conditions
          </a>
          , Privacy Policy, and all related policies.
        </label>
      </div>

      <div className="min-h-4">
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
        className={`w-full py-2 rounded-md text-white transition cursor-pointer duration-200 ${
          isFormComplete()
            ? "bg-orange-500 hover:bg-orange-600 cursor-pointer"
            : "bg-orange-400 cursor-default"
        }`}
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
