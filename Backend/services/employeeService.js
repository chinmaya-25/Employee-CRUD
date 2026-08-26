import prisma from "../config/prisma.js";

export const getAllEmployees = async () => {
  return prisma.employee.findMany({
    include: {
      department: true,
      role: true,
    },
    orderBy: {
      id: "asc",
    },
  });
};

export const getEmployeeById = (id) => {
  return prisma.employee.findUnique({
    where: {
      id,
    },
  });
};

export const createEmployee = async (data) => {
  return prisma.employee.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      salary: data.salary,
      status: data.status,
      departmentId: Number(data.departmentId),
      roleId: Number(data.roleId),
    },
    include: {
      department: true,
      role: true,
    },
  });
};

export const updateEmployee = async (id, data) => {
  return prisma.employee.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      email: data.email,
      salary: Number(data.salary),
      status: data.status,
      departmentId: Number(data.departmentId),
      roleId: Number(data.roleId),
    },
    include: {
      department: true,
      role: true,
    },
  });
};

export const softDeleteEmployee = (id) => {
  return prisma.employee.update({
    where: {
      id,
    },
    data: {
      status: "INACTIVE",
    },
  });
};

export const toggleEmployeeStatus = async (id, status) => {
  return prisma.employee.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

export const getEmployeeStats = async () => {
  const total = await prisma.employee.count();

  const active = await prisma.employee.count({
    where: {
      status: "ACTIVE",
    },
  });

  const inactive = await prisma.employee.count({
    where: {
      status: "INACTIVE",
    },
  });

  return {
    total,
    active,
    inactive,
  };
};
