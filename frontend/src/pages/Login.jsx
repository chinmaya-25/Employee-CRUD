import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });

      if (data.requiresMfa) {
        localStorage.setItem("pendingUserId", data.userId);
        navigate("/verify-mfa");
        return;
      }

      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/dashboard");
      toast.success("Logged in successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-slate-800">
          Employee Portal
        </h1>

        <p className="text-center text-slate-500 mt-2">Login to continue</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
