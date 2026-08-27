import prisma from "../config/prisma.js";

export const login = (email, password) => {
  return prisma.employee.findFirst({
    where: {
      email,
      password,
      status: "ACTIVE",
    },
    include: {
      role: true,
      department: true,
    },
  });
};

export const getCurrentUser = (id) => {
  return prisma.employee.findUnique({
    where: {
      id,
    },
    include: {
      role: true,
      department: true,
    },
  });
};
