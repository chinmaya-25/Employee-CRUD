import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout Failed");
      console.error(error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">Employee Management</h1>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-medium">{user?.name}</p>

            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
