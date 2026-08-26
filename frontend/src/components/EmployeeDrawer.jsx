import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "../api/axios";

export default function EmployeeDrawer({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    departmentId: "",
    salary: "",
    roleId: "",
    status: "ACTIVE",
  });
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
    fetchRoles();
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/employees", form);

      onSuccess(toast.success("Employee Details Updated successfully"));
      onClose();

      setForm({
        name: "",
        email: "",
        password: "",
        departmentId: "",
        salary: "",
        roleId: "",
        status: "ACTIVE",
      });
    } catch (error) {
      toast.error("Failed to update employee details");
      console.error(error);
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          bg-black/40
          z-40
          transition-opacity
          duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      <div
        className={`
          fixed
          top-0
          right-0
          h-screen
          w-[420px]
          bg-white
          shadow-2xl
          z-50
          transition-transform
          duration-300
          ease-in-out
          flex
          flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b bg-white">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Add Employee
            </h2>

            <p className="text-sm text-slate-500">
              Create a new employee record
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              w-8
              h-8
              rounded-full
              hover:bg-slate-100
              text-slate-500
              text-lg
            "
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            flex-1
            overflow-y-auto
            p-5
            space-y-4
          "
        >
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Department</label>

            <select
              name="departmentId"
              value={form.departmentId}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select Department</option>

              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Salary</label>

            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="50000"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Role</label>

            <select
              name="roleId"
              value={form.roleId}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select Role</option>

              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </form>

        <div className="border-t p-5 bg-white">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                border
                border-slate-300
                rounded-lg
                py-2.5
                text-slate-700
                hover:bg-slate-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="
                flex-1
                bg-blue-600
                hover:bg-blue-700
                text-white
                rounded-lg
                py-2.5
              "
            >
              Create Employee
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
