import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="w-64 min-h-[calc(100vh-73px)] bg-slate-900 text-white">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>

          {user?.role === "ADMIN" || user?.role === "MANAGER" ? (
            <li>
              <NavLink to="/employees">Employee Management</NavLink>
            </li>
          ) : null}

          <li>
            <NavLink to="/security">Security</NavLink>
          </li>

          <li>
            <NavLink to="/profile">My Profile</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
