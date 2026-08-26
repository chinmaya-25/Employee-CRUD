import prisma from "../config/prisma.js";

export const getDepartments = async () => {
  return prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          employees: true,
        },
      },
      employees: true,
    },
  });
};

export const createDepartment = async (data) => {
  return prisma.department.create({
    data,
  });
};
