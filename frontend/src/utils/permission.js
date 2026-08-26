export const canEditEmployee = (role) => {
  return ["ADMIN", "MANAGER"].includes(role);
};

export const canCreateEmployee = (role) => {
  return role === "ADMIN";
};
