import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAPI({ email, password: pw });
      localStorage.setItem("token", res.data.token); // save JWT token
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back 👋</h2>

        {error && (
          <div className="text-red-500 text-sm mb-3 text-center">{error}</div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg border focus:outline-primary"
          required
        />

        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg border focus:outline-primary"
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-lg hover:opacity-90 transition"
        >
          Login
        </button>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <button
            type="button"
            onClick={() => navigate("/forgot")}
            className="text-primary hover:underline"
          >
            Forgot Password?
          </button>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-primary hover:underline"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
