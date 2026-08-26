import { useEffect, useState } from "react";
import EmployeeDrawer from "../components/EmployeeDrawer";
import axios from "../api/axios";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";

export default function Employees() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);

  const fetchRoles = async () => {
    try {
      const { data } = await axios.get("/roles");

      setRoles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const { data } = await axios.get("/departments");

      setDepartments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchRoles();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data } = await axios.get("/employees");

      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (employee) => {
    setEditId(employee.id);

    setEditForm({
      name: employee.name,
      email: employee.email,
      salary: employee.salary,
      status: employee.status,
      departmentId: employee.department?.id,
      roleId: employee.role?.id,
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setEditForm({});
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`/employees/${id}`, editForm);
      setEditId(null);
      fetchEmployees();
      toast.success("Employee created successfully");
    } catch (error) {
      toast.error("Failed to create employee");
      console.error(error);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name?.toLowerCase().includes(search.toLowerCase()) ||
      employee.email?.toLowerCase().includes(search.toLowerCase()) ||
      employee.department?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = !statusFilter || employee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Employee Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage employees, roles and statuses
          </p>
        </div>

        {user?.role === "ADMIN" && (
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-sm transition"
          >
            Add Employee
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <p className="text-sm text-slate-500">Total Employees</p>

          <h2 className="text-3xl font-bold mt-2">{employees.length}</h2>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <p className="text-sm text-slate-500">Active</p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {
              employees.filter((employee) => employee.status === "ACTIVE")
                .length
            }
          </h2>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <p className="text-sm text-slate-500">Inactive</p>

          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {
              employees.filter((employee) => employee.status === "INACTIVE")
                .length
            }
          </h2>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <p className="text-sm text-slate-500">Admins</p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            {
              employees.filter((employee) => employee.role?.name === "ADMIN")
                .length
            }
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-5 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">All Status</option>

            <option value="ACTIVE">Active</option>

            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>
      {/* Employee Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-slate-700">
                  Name
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-700">
                  Email
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-700">
                  Department
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-700">
                  Salary
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-700">
                  Role
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-700">
                  Status
                </th>

                <th className="px-6 py-4 text-left font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    {editId === employee.id ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                name: e.target.value,
                              })
                            }
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </td>

                        <td className="px-6 py-4">
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                email: e.target.value,
                              })
                            }
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </td>

                        <td className="px-6 py-4">
                          <select
                            value={editForm.departmentId}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                departmentId: Number(e.target.value),
                              })
                            }
                            className="border rounded-lg px-3 py-2"
                          >
                            {departments.map((department) => (
                              <option key={department.id} value={department.id}>
                                {department.name}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={editForm.salary}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                salary: e.target.value,
                              })
                            }
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </td>

                        <td className="px-6 py-4">
                          <select
                            value={editForm.roleId}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                roleId: Number(e.target.value),
                              })
                            }
                            className="border rounded-lg px-3 py-2"
                          >
                            {roles.map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="px-6 py-4">
                          <select
                            value={editForm.status}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                status: e.target.value,
                              })
                            }
                            className="border rounded-lg px-3 py-2"
                          >
                            <option value="ACTIVE">ACTIVE</option>

                            <option value="INACTIVE">INACTIVE</option>
                          </select>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSave(employee.id)}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                            >
                              Save
                            </button>

                            <button
                              onClick={handleCancel}
                              className=" bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                              {employee.name?.charAt(0)?.toUpperCase()}
                            </div>

                            <span className="font-medium text-slate-800">
                              {employee.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {employee.email}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {employee.department?.name || "-"}
                        </td>

                        <td className="px-6 py-4 text-slate-600 font-medium">
                          ₹
                          {Number(employee.salary || 0).toLocaleString("en-IN")}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              employee.role?.name === "ADMIN"
                                ? "bg-purple-100 text-purple-700"
                                : employee.role?.name === "MANAGER"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {employee.role?.name}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              employee.status === "ACTIVE"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {employee.status}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          {(user?.role === "ADMIN" ||
                            user?.role === "MANAGER") && (
                            <button
                              onClick={() => handleEdit(employee)}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-5xl mb-4">👥</div>

                      <h3 className="text-lg font-semibold text-slate-700">
                        No Employees Found
                      </h3>

                      <p className="text-slate-500 mt-2">
                        Try changing your search criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <EmployeeDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSuccess={fetchEmployees}
      />
    </DashboardLayout>
  );
}
