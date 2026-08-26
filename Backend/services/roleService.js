import prisma from "../config/prisma.js";

export const getRoles = async () => {
  return prisma.role.findMany({
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

export const createRole = async (data) => {
  return prisma.role.create({
    data,
  });
};
