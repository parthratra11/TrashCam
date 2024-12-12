"use client";

import { useState } from "react";
import { register } from "../utils/register";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, role);
      setSuccess("User registered successfully!");
      setEmail("");
      setPassword("");
      setRole("admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-[#a5d6a7]">
        <h1 className="text-3xl font-bold text-center text-[#1b5e20] mb-8">
          Register User
        </h1>

        {success && (
          <p className="text-green-600 text-center mb-4">{success}</p>
        )}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-900 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-[#a5d6a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#81c784] text-gray-900 placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-900 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#a5d6a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#81c784] text-gray-900 placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block text-gray-900 text-sm font-semibold mb-2">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-[#a5d6a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#81c784] text-gray-900"
              required
            >
              <option value="admin">Admin</option>
              <option value="district head">Zonal Head</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1b5e20] text-white py-2 px-4 rounded-md hover:bg-[#2e7d32] transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
