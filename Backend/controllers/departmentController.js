import * as departmentService from "../services/departmentService.js";

export const getDepartments = async (req, res) => {
  const departments = await departmentService.getDepartments();
  res.json(departments);
};

export const createDepartment = async (req, res) => {
  const department = await departmentService.createDepartment(req.body);
  res.status(201).json(department);
};
