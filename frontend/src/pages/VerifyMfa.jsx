import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function VerifyMfa() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("pendingUserId");

      const { data } = await axios.post("/auth/verify-mfa", {
        userId,
        otp,
      });

      localStorage.setItem("token", data.token);

      localStorage.removeItem("pendingUserId");

      setUser(data.user);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid code");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">
          Two-Factor Authentication
        </h1>

        <p className="text-slate-500 text-center mt-2">
          Enter the 6-digit code from Google Authenticator
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              text-center
              text-xl
              tracking-widest
            "
          />

          <button
            type="submit"
            className="
              w-full
              mt-4
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
            "
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
