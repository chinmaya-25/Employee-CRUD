await prisma.role.createMany({
  data: [{ name: "ADMIN" }, { name: "MANAGER" }, { name: "EMPLOYEE" }],
});
