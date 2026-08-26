import { useEffect, useState } from "react";

import axios from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data } = await axios.get("/employees/stats");

    setStats(data);
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Total Employees</h2>

          <p className="text-4xl font-bold mt-2">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Active Employees</h2>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {stats.active}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Inactive Employees</h2>

          <p className="text-4xl font-bold text-red-600 mt-2">
            {stats.inactive}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
