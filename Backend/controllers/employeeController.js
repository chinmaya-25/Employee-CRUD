import * as employeeService from "../services/employeeService.js";

export const getEmployees = async (req, res) => {
  const employees = await employeeService.getAllEmployees();
  res.status(200).json(employees);
};

export const getEmployeeById = async (req, res) => {
  const employee = await employeeService.getEmployeeById(Number(req.params.id));

  if (!employee) {
    return res.status(404).json({
      message: "Employee not found",
    });
  }
  res.json(employee);
};

export const createEmployee = async (req, res) => {
  const employee = await employeeService.createEmployee(req.body);
  res.status(201).json(employee);
};

export const updateEmployee = async (req, res) => {
  const employee = await employeeService.updateEmployee(
    Number(req.params.id),
    req.body,
  );
  res.json(employee);
};

export const deleteEmployee = async (req, res) => {
  const employee = await employeeService.softDeleteEmployee(
    Number(req.params.id),
  );
  res.json(employee);
};

export const toggleEmployeeStatus = async (req, res) => {
  const employee = await employeeService.toggleEmployeeStatus(
    Number(req.params.id),
    req.body.status,
  );
  res.json(employee);
};

export const getStats = async (req, res) => {
  const stats = await employeeService.getEmployeeStats();
  res.json(stats);
};
