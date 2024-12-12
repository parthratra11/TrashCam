"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "zonal-head" | "driver">("admin");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otp, setOtp] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect based on selected role
      switch (role) {
        case "admin":
          router.push("/admin");
          break;
        case "zonal-head":
          router.push("/zonal-head");
          break;
        case "driver":
          router.push("/driver");
          break;
        default:
          router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-[#a5d6a7]">
        <h1 className="text-3xl font-bold text-center text-[#1b5e20] mb-8">
          Login
        </h1>

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
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Please Select User Role
            </label>
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "admin" | "zonal-head" | "driver")
              }
              className="w-full px-4 py-2 border border-[#a5d6a7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#81c784] bg-white text-gray-600"
              required
            >
              <option value="admin">Admin</option>
              <option value="zonal-head">Zonal Head</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-[#1b5e20] hover:text-[#0d3010] text-sm font-medium"
          >
            Forgot Your Password?
          </button>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#2e7d32] to-[#388e3c] text-white rounded-md font-semibold hover:from-[#1b5e20] hover:to-[#2e7d32] transition-all duration-300 shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>

      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-[#1b5e20] mb-4">
              Reset Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-900 text-sm font-semibold mb-2">
                  Email
                </label>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2 border border-[#a5d6a7] rounded-md text-gray-900 placeholder-gray-400"
                    placeholder="Enter your email"
                  />
                  <button
                    className="px-4 py-2 bg-[#1b5e20] text-white rounded-md hover:bg-[#0d3010]"
                    onClick={() => {}}
                  >
                    Get OTP
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-semibold mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border border-[#a5d6a7] rounded-md text-gray-900 placeholder-gray-400"
                  placeholder="Enter OTP"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1 py-2 border border-[#1b5e20] text-[#1b5e20] rounded-md hover:bg-[#f5f5f0]"
                >
                  Cancel
                </button>
                <button className="flex-1 py-2 bg-[#1b5e20] text-white rounded-md hover:bg-[#0d3010]">
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
