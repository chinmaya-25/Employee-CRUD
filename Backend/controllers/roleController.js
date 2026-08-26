import * as roleService from "../services/roleService.js";

export const getRoles = async (req, res) => {
  const roles = await roleService.getRoles();
  res.json(roles);
};

export const createRole = async (req, res) => {
  const role = await roleService.createRole(req.body);
  res.status(201).json(role);
};
