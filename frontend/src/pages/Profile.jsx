import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>

            <p className="text-lg font-medium">{user?.name}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>

            <p className="text-lg font-medium">{user?.email}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Role</label>

            <p className="text-lg font-medium">{user?.role}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
