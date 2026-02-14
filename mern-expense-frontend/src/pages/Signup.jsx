import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupAPI } from "../services/authService"; // ✅ correct import

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await signupAPI(form);
      alert(res.data?.message || "Signup successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        {error && (
          <div className="text-red-500 text-sm mb-3 text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full p-3 mb-4 rounded-lg border"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full p-3 mb-4 rounded-lg border"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full p-3 mb-6 rounded-lg border"
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-lg"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-primary hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
