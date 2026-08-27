import jwt from "jsonwebtoken";
import * as authService from "../services/authService.js";
import prisma from "../config/prisma.js";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

export const setupMfa = async (req, res) => {
  try {
    const secret = speakeasy.generateSecret({
      name: `EmployeeCRUD (${req.user.email})`,
    });

    await prisma.employee.update({
      where: {
        id: req.user.id,
      },
      data: {
        mfaSecret: secret.base32,
      },
    });

    const qrCode = await QRCode.toDataURL(secret.otpauth_url);

    res.json({
      secret: secret.base32,
      qrCode,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyMfaLogin = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const employee = await prisma.employee.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        role: true,
        department: true,
      },
    });

    const verified = speakeasy.totp.verify({
      secret: employee.mfaSecret,
      encoding: "base32",
      token: otp,
    });

    if (!verified) {
      return res.status(401).json({
        message: "Invalid OTP",
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

    res.json({
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

export const enableMfa = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await prisma.employee.findUnique({
      where: {
        id: req.user.id,
      },
    });

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: "base32",
      token,
    });

    if (!verified) {
      return res.status(400).json({
        message: "Invalid code",
      });
    }

    await prisma.employee.update({
      where: {
        id: req.user.id,
      },
      data: {
        mfaEnabled: true,
      },
    });

    res.json({
      message: "MFA enabled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await authService.login(email, password);

    if (!employee) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    if (employee.mfaEnabled) {
      return res.json({
        requiresMfa: true,
        userId: employee.id,
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

    res.json({
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
