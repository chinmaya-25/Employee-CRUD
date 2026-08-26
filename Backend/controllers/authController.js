import jwt from "jsonwebtoken";
import * as authService from "../services/authService.js";
import prisma from "../config/prisma.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await authService.login(email, password);

    if (!employee) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: employee.id,
        email: employee.email,
        role: employee.role.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({
      token,
      user: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role.name,
        department: employee.department?.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const currentUser = async (req, res) => {
  const employee = await prisma.employee.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      role: true,
      department: true,
    },
  });

  res.json({
    user: {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role.name,
      department: employee.department?.name,
    },
  });
};
