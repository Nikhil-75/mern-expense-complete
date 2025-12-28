import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotAPI } from "../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotAPI({ email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "No account found!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your registered email"
          className="w-full p-3 mb-4 rounded-lg border focus:outline-primary"
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-lg hover:opacity-90 transition"
        >
          Send Reset Link
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}

        <div className="mt-4 text-center text-sm text-gray-600">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-primary hover:underline"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}
