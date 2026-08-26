import prisma from "../config/prisma.js";

export const login = async (email, password) => {
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
