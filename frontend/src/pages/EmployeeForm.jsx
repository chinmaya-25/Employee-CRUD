import { useState } from "react";
import axios from "../api/axios";

export default function EmployeeForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    role: "EMPLOYEE",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "/employees",
      form
    );

    alert("Employee Created");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        placeholder="Password"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <button type="submit">
        Create Employee
      </button>
    </form>
  );
}