import { useState } from "react";

export default function EmployeeModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    role: "EMPLOYEE",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Employee</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            name="department"
            placeholder="Department"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <select
            name="role"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          >
            <option value="EMPLOYEE">EMPLOYEE</option>

            <option value="MANAGER">MANAGER</option>

            <option value="ADMIN">ADMIN</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
