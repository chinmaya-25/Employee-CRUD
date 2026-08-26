import prisma from "./config/prisma.js";

// const employee = await prisma.employee.create({
//   data: {
//     name: "Admin",
//     email: "admin@test.com",
//     password: "admin123",
//     role: "ADMIN",
//   },
// });

// console.log(employee);

await prisma.role.createMany({
  data: [{ name: "ADMIN" }, { name: "MANAGER" }, { name: "EMPLOYEE" }],
});

await prisma.department.createMany({
  data: [
    { name: "Engineering" },
    { name: "HR" },
    { name: "Finance" },
    { name: "Sales" },
  ],
});

await prisma.$disconnect();
